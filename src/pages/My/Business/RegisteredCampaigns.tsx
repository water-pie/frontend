import { useState, useEffect } from 'react';
import { getManagedExperienceListApi } from 'apis/manage';
import useUserStore from 'store/useUserStore';
import { type Experience } from 'types/apis/experience';
import styled from '@emotion/styled';
import InfluencerSelectionModal from 'components/Modal/InfluencerSelectionModal';
import CampaignReportModal from 'components/Modal/CampaignReportModal';

const RegisteredCampaignsPage = () => {
  const { userInfo } = useUserStore();
  const [campaigns, setCampaigns] = useState<Experience[]>([]);
  const [isInfluenceModal, setIsInfluenceModal] = useState(false);
  const [isReportModal, setIsReportModal] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (userInfo?.token) {
        try {
          const response = await getManagedExperienceListApi(userInfo.token);
          setCampaigns(response.data);
        } catch (error) {
          console.error("Failed to fetch campaigns:", error);
        }
      }
    };

    fetchCampaigns();
  }, [userInfo]);

  const handleOpenReviewModal = async (campaignId: number) => {
    setSelectedCampaignId(campaignId);
    setIsReportModal(true);
  };

  const handleOpenInfluenceModal = (campaignId: number) => {
    setSelectedCampaignId(campaignId);
    setIsInfluenceModal(true);
  };

  return (
    <Container>
      <h1>등록한 캠페인</h1>
      {campaigns.length > 0 ? (
        <CampaignList>
          {campaigns.map(campaign => (
            <CampaignCard key={campaign.id}>
              <CampaignImage src={campaign.image_urls[0]} alt={campaign.title} />
              <CampaignInfo>
                <h3>{campaign.title}</h3>
                <p>리뷰 마감: {new Date().toLocaleDateString()}</p> {/* Placeholder date */}
                <p>신청 현황: {campaign.applicated_num}명 / {campaign.member_num}명</p>
              </CampaignInfo>
              <Buttons>
                {campaign.possible_time_application_left > 0 ? (
                  <Button onClick={() => handleOpenInfluenceModal(campaign.id)}>리뷰어 선정</Button>
                ) : (
                  <Button onClick={() => handleOpenReviewModal(campaign.id)}>보고서 보기</Button>
                )}
              </Buttons>
            </CampaignCard>
          ))}
        </CampaignList>
      ) : (
        <p>등록한 캠페인이 없습니다.</p>
      )}
      {isInfluenceModal && selectedCampaignId && 
        <InfluencerSelectionModal
          campaignId={selectedCampaignId}
          onClose={() => setIsInfluenceModal(false)}
        />
      }
      {isReportModal && selectedCampaignId &&
        <CampaignReportModal 
          campaignId={selectedCampaignId}
          onClose={() => setIsReportModal(false)}
        />
      }
    </Container>
  );
};

export default RegisteredCampaignsPage;

const Container = styled.div`
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const CampaignList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CampaignCard = styled.div`
  display: flex;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
  }
`;

const CampaignImage = styled.img`
  width: 150px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 100%;
    height: 150px;
    margin-right: 0;
    margin-bottom: 15px;
  }
`;

const CampaignInfo = styled.div`
  flex-grow: 1;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 15px;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
  }
`;

const Button = styled.button`
  word-break: keep-all;
  white-space: nowrap;
  padding: 10px 15px;
  border: 1px solid #ddd;
  background-color: #f7f7f7;
  border-radius: 5px;
  cursor: pointer;

  @media (max-width: 768px) {
    flex: 1;
    padding: 10px 5px;
    font-size: 14px;
  }
`;
