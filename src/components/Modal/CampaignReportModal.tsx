import { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { getCampaignReviewListApi, moderateReviewApi } from '../../apis/manage';
import useUserStore from '../../store/useUserStore';
import { type CampaignReview } from '../../types/apis/manage';

interface Props {
  campaignId: number;
  onClose: () => void;
}

const CampaignReportModal = ({ campaignId, onClose }: Props) => {
  const [reviews, setReviews] = useState<CampaignReview[]>([]);
  const [selectedReview, setSelectedReview] = useState<CampaignReview | null>(null);
  const { userInfo } = useUserStore();

  const fetchReviews = useCallback(async () => {
    if (userInfo?.token) {
      try {
        const response = await getCampaignReviewListApi(campaignId, userInfo.token);
        setReviews(response.data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
        alert('리뷰 목록을 불러오는데 실패했습니다.');
      }
    }
  }, [campaignId, userInfo?.token]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleModerate = async (applicationId: number, decision: 'approve' | 'reject') => {
    if (userInfo?.token) {
      try {
        await moderateReviewApi(applicationId, decision, userInfo.token);
        alert(`리뷰를 ${decision === 'approve' ? '승인' : '거절'}했습니다.`);
        fetchReviews(); // Refresh the list
        if (selectedReview && selectedReview.applicationId === applicationId) {
          setSelectedReview(prev => prev ? { ...prev, submissionStatus: decision.toUpperCase() } : null);
        }
      } catch (error) {
        console.error('Failed to moderate review:', error);
        alert('리뷰 심사에 실패했습니다.');
      }
    }
  };

  const handleReviewClick = (review: CampaignReview) => {
    setSelectedReview(review);
  };

  const handleBackToList = () => {
    setSelectedReview(null);
  };

  if (selectedReview) {
    return (
      <ModalBackground onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <Header>
            <BackButton onClick={handleBackToList}>←</BackButton>
            <h2>리뷰 확인</h2>
            <CloseButton onClick={onClose}>X</CloseButton>
          </Header>
          <ReviewDetailContainer>
            <DetailRow>
              <DetailLabel>인플루언서:</DetailLabel>
              <DetailValue>{selectedReview.influencerName}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>리뷰 메시지:</DetailLabel>
              <DetailValue>{selectedReview.reviewMessage}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>리뷰 URL:</DetailLabel>
              <DetailValue>
                {selectedReview.reviewUrls.length > 0 && (
                  <a href={selectedReview.reviewUrls[0]} target="_blank" rel="noopener noreferrer">
                    {selectedReview.reviewUrls[0]}
                  </a>
                )}
              </DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>제출일:</DetailLabel>
              <DetailValue>{new Date(selectedReview.submittedAt).toLocaleDateString()}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>상태:</DetailLabel>
              <DetailValue>{selectedReview.submissionStatus}</DetailValue>
            </DetailRow>
            {selectedReview.submissionStatus === 'PENDING_REVIEW' && (
              <ButtonContainer>
                <ApproveButton onClick={() => handleModerate(selectedReview.applicationId, 'approve')}>승인</ApproveButton>
                <RejectButton onClick={() => handleModerate(selectedReview.applicationId, 'reject')}>거절</RejectButton>
              </ButtonContainer>
            )}
          </ReviewDetailContainer>
        </ModalContent>
      </ModalBackground>
    );
  }

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>캠페인 보고서</h2>
          <CloseButton onClick={onClose}>X</CloseButton>
        </Header>
        <Table>
          <thead>
            <tr>
              <th>No</th>
              <th>인플루언서</th>
              <th>리뷰 메시지</th>
              <th>리뷰 URL</th>
              <th>제출일</th>
              <th>상태</th>
              <th>심사</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review.applicationId} onClick={() => handleReviewClick(review)} style={{ cursor: 'pointer' }}>
                <td>{index + 1}</td>
                <td>{review.influencerName}</td>
                <td>{review.reviewMessage}</td>
                <td>
                  {review.reviewUrls.length > 0 && (
                    <a href={review.reviewUrls[0]} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      {review.reviewUrls[0]}
                    </a>
                  )}
                </td>
                <td>{new Date(review.submittedAt).toLocaleDateString()}</td>
                <td>{review.submissionStatus}</td>
                <td>
                  {review.submissionStatus === 'PENDING_REVIEW' && (
                    <ButtonContainer onClick={(e) => e.stopPropagation()}>
                      <ApproveButton onClick={() => handleModerate(review.applicationId, 'approve')}>승인</ApproveButton>
                      <RejectButton onClick={() => handleModerate(review.applicationId, 'reject')}>거절</RejectButton>
                    </ButtonContainer>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ModalContent>
    </ModalBackground>
  );
};


export default CampaignReportModal;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 1000px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  th {
    background-color: #f2f2f2;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
`;

const ActionButton = styled.button`
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

const ApproveButton = styled(ActionButton)`
  background-color: #28a745;
`;

const RejectButton = styled(ActionButton)`
  background-color: #dc3545;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-right: 10px;
`;

const ReviewDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
`;

const DetailLabel = styled.div`
  font-weight: bold;
  width: 120px;
  text-align: left;
`;

const DetailValue = styled.div`
  flex-grow: 1;
  text-align: left;
`;
