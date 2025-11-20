import { useState, useEffect } from 'react';
import * as S from 'styles/modal/socialMediaModal';
import { Input } from '../Input/Input';
import { updatePlatformInfoApi } from 'apis/user';
import useUserStore from 'store/useUserStore';
import { type InfluencerInfo } from 'types/apis/user';

interface SocialMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  userInfoData: InfluencerInfo | null;
  onUpdate: (updatedData: InfluencerInfo) => void;
}

const SocialMediaModal = ({ isOpen, onClose, userInfoData, onUpdate }: SocialMediaModalProps) => {
  const { userInfo } = useUserStore();
  const [blogUrl, setBlogUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  useEffect(() => {
    if (userInfoData) {
      setBlogUrl(userInfoData.influencer.blogUrl || '');
      setInstagramUrl(userInfoData.influencer.instagramUrl || '');
      setTiktokUrl(userInfoData.influencer.tiktokUrl || '');
      setYoutubeUrl(userInfoData.influencer.youtubeUrl || '');
    }
  }, [userInfoData]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!userInfo?.token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const payload = { blogUrl, instagramUrl, tiktokUrl, youtubeUrl };
      const response = await updatePlatformInfoApi(payload);

      if (response.status === "success") {
        alert("URL이 성공적으로 수정되었습니다!");
        onUpdate({ ...userInfoData, ...payload } as InfluencerInfo);
        onClose();
      } else {
        alert(`URL 수정 실패: ${response.message}`);
      }
    } catch (error) {
      console.error("URL 수정 중 오류 발생:", error);
      alert("URL 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <S.Overlay>
      <S.ModalContainer>
        <S.ModalHeader>
          <S.ModalTitle>소셜 미디어 URL 수정</S.ModalTitle>
          <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        </S.ModalHeader>
        <S.ModalBody>
          <S.FormGroup>
            <S.Label>블로그 URL</S.Label>
            <Input
              type="text"
              placeholder="https://..."
              value={blogUrl}
              onChange={(e) => setBlogUrl(e.target.value)}
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>인스타그램 URL</S.Label>
            <Input
              type="text"
              placeholder="https://..."
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>틱톡 URL</S.Label>
            <Input
              type="text"
              placeholder="https://..."
              value={tiktokUrl}
              onChange={(e) => setTiktokUrl(e.target.value)}
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>유튜브 URL</S.Label>
            <Input
              type="text"
              placeholder="https://..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
          </S.FormGroup>
          <S.SubmitButton onClick={handleSubmit}>수정하기</S.SubmitButton>
        </S.ModalBody>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default SocialMediaModal;
