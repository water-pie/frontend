import { useState } from 'react';
import * as S from 'styles/modal/reviewRegistrationModal';
import { Input } from '../Input/Input';
import type { CampaignItem } from 'types/campaign';
import { registerReviewApi } from 'apis/experience';
import useUserStore from 'store/useUserStore';

interface ReviewRegistrationModalProps {
  isOpen: boolean;
  onClose: (shouldRefresh?: boolean) => void; // Allow passing a signal to refresh
  campaignDetails: CampaignItem & { exp_id: number };
}

const ReviewRegistrationModal = ({ isOpen, onClose, campaignDetails }: ReviewRegistrationModalProps) => {
  const { userInfo } = useUserStore();
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [messageToOwner, setMessageToOwner] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  if (!isOpen) return null;

  // URL validation function
  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (isLoading) return; // Prevent multiple submissions

    if (!userInfo?.token) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!url1) {
      alert('URL 1을 입력해주세요.');
      return;
    }
    if (!isValidUrl(url1)) {
      alert('URL 1 형식이 올바르지 않습니다.');
      return;
    }

    const reviewUrls = [url1];
    if (url2) {
      if (!isValidUrl(url2)) {
        alert('URL 2 형식이 올바르지 않습니다.');
        return;
      }
      reviewUrls.push(url2);
    }

    setIsLoading(true); // Start loading
    try {
      const response = await registerReviewApi(campaignDetails.exp_id, {
        urls: reviewUrls,
        message: messageToOwner,
      }, userInfo.token);

      if (response.status === "success") {
        alert('리뷰가 성공적으로 등록되었습니다!');
        onClose(true); // Close modal and signal to refresh
      } else {
        alert(`리뷰 등록 실패: ${response.message}`);
        onClose(); // Close without refreshing
      }
    } catch (error) {
      console.error("리뷰 등록 중 오류 발생:", error);
      alert("리뷰 등록 중 오류가 발생했습니다.");
      onClose(); // Close without refreshing
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <S.Overlay>
      <S.ModalContainer>
        <S.ModalHeader>
          <S.ModalTitle>리뷰 등록</S.ModalTitle>
          <S.CloseButton onClick={() => onClose()}>&times;</S.CloseButton>
        </S.ModalHeader>
        <S.ModalBody>
          <S.CampaignInfo>
            <S.InfoItem>
              <S.Label>캠페인명</S.Label>
              <S.Value>{campaignDetails.title}</S.Value>
            </S.InfoItem>
            <S.InfoItem>
              <S.Label>미션</S.Label>
              <S.Value>{campaignDetails.mission}</S.Value>
            </S.InfoItem>
            <S.InfoItem>
              <S.Label>미션 마감일</S.Label>
              <S.Value>{campaignDetails.missionDeadline}</S.Value>
            </S.InfoItem>
          </S.CampaignInfo>

          <S.FormGroup>
            <S.Label>URL 1 입력 *</S.Label>
            <Input
              type="text"
              placeholder="예) https://instagram.com"
              value={url1}
              onChange={(e) => setUrl1(e.target.value)}
              disabled={isLoading}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>URL 2 입력</S.Label>
            <Input
              type="text"
              placeholder="예) https://blog.naver.com"
              value={url2}
              onChange={(e) => setUrl2(e.target.value)}
              disabled={isLoading}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>사장님께 드리고 싶은 말씀이 있다면 적어주세요. (선택)</S.Label>
            <textarea
              placeholder="예) 감사합니다."
              value={messageToOwner}
              onChange={(e) => setMessageToOwner(e.target.value)}
              disabled={isLoading}
            />
          </S.FormGroup>

          <S.SubmitButton onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? '등록 중...' : '리뷰 등록하기'}
          </S.SubmitButton>
        </S.ModalBody>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default ReviewRegistrationModal;
