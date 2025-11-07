import { useState, useEffect } from 'react';
import * as S from 'styles/adminModal';
import { getInquiryByIdForAdmin, addInquiryAnswer, deleteInquiryAnswer } from 'apis/inquires';
import useUserStore from 'store/useUserStore';

interface AdminInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiryId?: number;
  onSuccess: () => void;
}

export default function AdminInquiryModal({
  isOpen, onClose, inquiryId, onSuccess
}: AdminInquiryModalProps) {
  const { userInfo } = useUserStore();
  const [inquiry, setInquiry] = useState<any>(null); // Store inquiry details
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && inquiryId) {
      const fetchInquiryDetails = async () => {
        setLoading(true);
        try {
          if (!userInfo?.token) {
            alert("로그인이 필요합니다.");
            onClose();
            return;
          }
          const response = await getInquiryByIdForAdmin(inquiryId, userInfo.token);
          setInquiry(response.data);
          setAnswer(response.data.answer || ''); // Pre-fill answer if exists
        } catch (error) {
          console.error("문의 상세 정보를 불러오는데 실패했습니다:", error);
          alert("문의 상세 정보를 불러오는데 실패했습니다.");
          onClose();
        } finally {
          setLoading(false);
        }
      };
      fetchInquiryDetails();
    } else {
      // Reset state when modal closes or inquiryId changes
      setInquiry(null);
      setAnswer('');
    }
  }, [isOpen, inquiryId, userInfo?.token, onClose]);

  const handleSubmitAnswer = async () => {
    if (!userInfo?.token) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!answer.trim()) {
      alert("답변 내용을 입력해주세요.");
      return;
    }
    if (!inquiryId) {
      alert("문의 ID가 없습니다.");
      return;
    }

    setLoading(true);
    try {
      await addInquiryAnswer(inquiryId, answer, userInfo.token);
      alert("답변이 성공적으로 저장되었습니다.");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("답변 저장 중 오류가 발생했습니다:", error);
      alert("답변 저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAnswer = async () => {
    if (!userInfo?.token) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!inquiryId) {
      alert("문의 ID가 없습니다.");
      return;
    }
    if (!window.confirm("정말로 답변을 삭제하시겠습니까?")) {
      return;
    }

    setLoading(true);
    try {
      await deleteInquiryAnswer(inquiryId, userInfo.token);
      alert("답변이 성공적으로 삭제되었습니다.");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("답변 삭제 중 오류가 발생했습니다:", error);
      alert("답변 삭제 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  if (loading && !inquiry) return <S.ModalOverlay><S.ModalContent>로딩 중...</S.ModalContent></S.ModalOverlay>;
  if (!inquiry) return null; // Should not happen if loading is handled

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>
          <h2>문의 상세 및 답변</h2>
          <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        </S.ModalHeader>
        <S.Form>
          <S.FormGroup>
            <label>문의 제목</label>
            <input type="text" value={inquiry.title} disabled />
          </S.FormGroup>
          <S.FormGroup>
            <label>문의 내용</label>
            <textarea value={inquiry.content} disabled />
          </S.FormGroup>
          <S.FormGroup>
            <label>작성자</label>
            <input type="text" value={inquiry.user?.name || '알 수 없음'} disabled />
          </S.FormGroup>
          <S.FormGroup>
            <label htmlFor="answer">답변</label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="답변을 입력해주세요."
            />
          </S.FormGroup>
          <S.ButtonGroup>
            <S.SubmitButton type="button" onClick={handleSubmitAnswer} disabled={loading}>
              {loading ? '저장 중...' : '답변 저장'}
            </S.SubmitButton>
            {inquiry.answer && (
              <S.CancelButton type="button" onClick={handleDeleteAnswer} disabled={loading}>
                {loading ? '삭제 중...' : '답변 삭제'}
              </S.CancelButton>
            )}
            <S.CancelButton type="button" onClick={onClose}>
              닫기
            </S.CancelButton>
          </S.ButtonGroup>
        </S.Form>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}
