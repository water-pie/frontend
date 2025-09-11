import { useState } from 'react';
import * as S from 'styles/modal/reviewRegistrationModal'; // Will create this file
import { Input } from '../Input/Input'; // Assuming a generic Input component exists

interface ReviewRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignDetails: {
    id: number;
    title: string;
    mission: string;
    missionDeadline: string;
  };
}

const ReviewRegistrationModal = ({ isOpen, onClose, campaignDetails }: ReviewRegistrationModalModalProps) => {
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [messageToOwner, setMessageToOwner] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!url1) {
      alert('URL 1을 입력해주세요.');
      return;
    }
    alert('리뷰가 성공적으로 등록되었습니다!');
    // Here you would typically send the data to a backend
    console.log({
      campaignId: campaignDetails.id,
      url1,
      url2,
      messageToOwner,
    });
    onClose(); // Close modal after submission
  };

  return (
    <S.Overlay>
      <S.ModalContainer>
        <S.ModalHeader>
          <S.ModalTitle>리뷰 등록</S.ModalTitle>
          <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
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
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>URL 2 입력</S.Label>
            <Input
              type="text"
              placeholder="예) https://blog.naver.com"
              value={url2}
              onChange={(e) => setUrl2(e.target.value)}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>사장님께 드리고 싶은 말씀이 있다면 적어주세요. (선택)</S.Label>
            <S.Textarea
              placeholder="예) 감사합니다."
              value={messageToOwner}
              onChange={(e) => setMessageToOwner(e.target.value)}
            />
          </S.FormGroup>

          <S.SubmitButton onClick={handleSubmit}>리뷰 등록하기</S.SubmitButton>
        </S.ModalBody>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default ReviewRegistrationModal;
