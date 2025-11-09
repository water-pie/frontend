import { useState, useEffect } from 'react';
import * as S from 'styles/adminModal';
import {
  createNoticeApi, getNoticeDetailApi, updateNoticeApi
} from 'apis/notice';
import {
  createEventApi, getEventDetailApi, updateEventApi
} from 'apis/event';
import useUserStore from 'store/useUserStore';

interface AdminPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postType: 'notice' | 'event';
  mode: 'create' | 'view' | 'edit';
  postId?: number;
  onSuccess: () => void;
}

export default function AdminPostModal({
  isOpen, onClose, postType, mode, postId, onSuccess
}: AdminPostModalProps) {
  const { userInfo } = useUserStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]); // For new uploads
  const [existingImages, setExistingImages] = useState<string[]>([]); // For existing image URLs
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && (mode === 'view' || mode === 'edit') && postId) {
      const fetchPostDetails = async () => {
        setLoading(true);
        try {
          let response;
          if (postType === 'notice') {
            response = await getNoticeDetailApi(postId);
          } else {
            response = await getEventDetailApi(postId);
          }
          setTitle(response.data.title);
          setContent(response.data.content);
          setExistingImages(response.data.images || []);
        } catch (error) {
          console.error("게시글 상세 정보를 불러오는데 실패했습니다:", error);
          alert("게시글 상세 정보를 불러오는데 실패했습니다.");
          onClose();
        } finally {
          setLoading(false);
        }
      };
      fetchPostDetails();
    } else if (isOpen && mode === 'create') {
      // Reset form for create mode
      setTitle('');
      setContent('');
      setImages([]);
      setExistingImages([]);
    }
  }, [isOpen, mode, postId, postType, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo?.token) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      images.forEach(image => formData.append("images", image));

      if (mode === 'create') {
        if (postType === 'notice') {
          await createNoticeApi(formData, userInfo.token);
        } else {
          await createEventApi(formData, userInfo.token);
        }
        alert("게시글이 성공적으로 작성되었습니다.");
      } else if (mode === 'edit') {
        if (!postId) {
          alert("게시글 ID가 없습니다.");
          return;
        }
        await (postType === 'notice' ? updateNoticeApi : updateEventApi)(postId, formData, userInfo.token);
        alert("게시글이 성공적으로 수정되었습니다.");
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("게시글 저장 중 오류가 발생했습니다:", error);
      alert("게시글 저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const isViewMode = mode === 'view';

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>
          <h2>{mode === 'create' ? '새 게시글 작성' : (isViewMode ? '게시글 상세' : '게시글 수정')}</h2>
          <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        </S.ModalHeader>
        <S.Form onSubmit={handleSubmit}>
          <S.FormGroup>
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isViewMode}
            />
          </S.FormGroup>
          <S.FormGroup>
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isViewMode}
            />
          </S.FormGroup>
          <S.FormGroup>
            <label htmlFor="images">이미지</label>
            {isViewMode ? (
              <div>
                {existingImages.length > 0 ? (
                  existingImages.map((img, index) => (
                    <img key={index} src={img} alt={`Post Image ${index}`} style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }} />
                  ))
                ) : (
                  <p>이미지 없음</p>
                )}
              </div>
            ) : (
              <input
                type="file"
                id="images"
                multiple
                onChange={(e) => setImages(Array.from(e.target.files || []))}
              />
            )}
            {existingImages.length > 0 && !isViewMode && (
              <div>
                <p>기존 이미지:</p>
                {existingImages.map((img, index) => (
                  <img key={index} src={img} alt={`Existing Image ${index}`} style={{ maxWidth: '80px', maxHeight: '80px', marginRight: '5px' }} />
                ))}
              </div>
            )}
          </S.FormGroup>
          <S.ButtonGroup>
            {!isViewMode && (
              <S.SubmitButton type="submit" disabled={loading}>
                {loading ? '저장 중...' : '저장'}
              </S.SubmitButton>
            )}
            <S.CancelButton type="button" onClick={onClose}>
              {isViewMode ? '닫기' : '취소'}
            </S.CancelButton>
          </S.ButtonGroup>
        </S.Form>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}
