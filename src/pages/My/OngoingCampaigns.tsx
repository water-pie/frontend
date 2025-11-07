import { useState, useEffect } from 'react';
import * as S from 'styles/my/ongoingCampaigns';
import { CampaignDetail } from 'mocks/campaign';
import ReviewRegistrationModal from 'components/Modal/ReviewRegistrationModal';
import type { CampaignItem } from 'types/campaign';
import { getOngoingExperiencesApi } from 'apis/experience';
import useUserStore from 'store/useUserStore';

interface OngoingCampaign {
  exp_id: number;
  title: string;
  schedule: string;
  process_status: number;
}

const OngoingCampaigns = () => {
  const { userInfo } = useUserStore();
  const [ongoingCampaigns, setOngoingCampaigns] = useState<OngoingCampaign[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignItem | null>(null);

  const fetchOngoingCampaigns = async () => {
    if (!userInfo?.token) return;
    try {
      const response = await getOngoingExperiencesApi(userInfo.token);
      if (response.status === "success" && response.data) {
        // Assuming UserExperienceSummary is compatible with OngoingCampaign
        setOngoingCampaigns(response.data as OngoingCampaign[]);
      } else {
        setOngoingCampaigns([]);
      }
    } catch (error) {
      console.error("Failed to fetch ongoing campaigns:", error);
      setOngoingCampaigns([]);
    }
  };

  useEffect(() => {
    fetchOngoingCampaigns();
  }, [userInfo?.token]);

  const handleRegisterReview = (campaignId: number) => {
    // This part needs adjustment if CampaignItem is significantly different from OngoingCampaign
    // For now, let's find the campaign from the fetched list
    const campaignToOpen = ongoingCampaigns.find(c => c.exp_id === campaignId);
    if (campaignToOpen) {
      setSelectedCampaign({
        id: campaignToOpen.exp_id,
        image: CampaignDetail[0].image_urls[0], // Placeholder, need actual image_url from API
        title: campaignToOpen.title,
        offerContent: campaignToOpen.schedule, // Placeholder, need actual offerContent from API
        mission: "", // Placeholder, need actual mission from API
        missionDeadline: campaignToOpen.schedule, // Placeholder, need actual deadline from API
        status: "", // Placeholder, need actual status from API
      });
      setIsModalOpen(true);
    }
  };

  return (
    <S.OngoingCampaignsContainer>
      <S.Title>진행중인 캠페인</S.Title>
      <S.CampaignList>
        {ongoingCampaigns.length > 0 ? (
          ongoingCampaigns.map((campaign) => (
            <S.CampaignCard key={campaign.exp_id}>
              <S.CampaignImage src={CampaignDetail[0].image_urls[0]} alt={campaign.title} /> {/* Placeholder */}
              <S.CampaignInfo>
                <S.CampaignTitle>{campaign.title}</S.CampaignTitle>
                <S.CampaignDescription>일정: {campaign.schedule}</S.CampaignDescription>
              </S.CampaignInfo>
              <S.CampaignStatusInfo>
                <S.StatusItem>
                  <S.StatusLabel>상태</S.StatusLabel>
                  <S.StatusButton onClick={() => handleRegisterReview(campaign.exp_id)}>
                    {campaign.process_status}
                  </S.StatusButton>
                </S.StatusItem>
              </S.CampaignStatusInfo>
            </S.CampaignCard>
          ))
        ) : (
          <p>진행중인 캠페인이 없습니다.</p>
        )}
      </S.CampaignList>

      {isModalOpen && selectedCampaign && (
        <ReviewRegistrationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          campaignDetails={selectedCampaign as CampaignItem & { exp_id: number }}
        />
      )}
    </S.OngoingCampaignsContainer>
  );
};

export default OngoingCampaigns;