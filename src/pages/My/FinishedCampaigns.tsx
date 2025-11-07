
import { useState, useEffect } from 'react';
import * as S from 'styles/my/finishedCampaigns';
import { CampaignDetail } from 'mocks/campaign';
import { getPastExperiencesApi } from 'apis/experience';
import useUserStore from 'store/useUserStore';

interface FinishedCampaign {
  exp_id: number;
  title: string;
  schedule: string;
  process_status: number;
}

const FinishedCampaigns = () => {
  const { userInfo } = useUserStore();
  const [finishedCampaigns, setFinishedCampaigns] = useState<FinishedCampaign[]>([]);

  const fetchFinishedCampaigns = async () => {
    if (!userInfo?.token) return;
    try {
      const response = await getPastExperiencesApi(userInfo.token);
      if (response.status === "success" && response.data) {
        // Assuming UserExperienceSummary is compatible with FinishedCampaign
        setFinishedCampaigns(response.data as FinishedCampaign[]);
      } else {
        setFinishedCampaigns([]);
      }
    } catch (error) {
      console.error("Failed to fetch finished campaigns:", error);
      setFinishedCampaigns([]);
    }
  };

  useEffect(() => {
    fetchFinishedCampaigns();
  }, [userInfo?.token]);

  return (
    <S.FinishedCampaignsContainer>
      <S.Title>종료된 캠페인</S.Title>
      <S.CampaignList>
        {finishedCampaigns.length > 0 ? (
          finishedCampaigns.map((campaign) => (
            <S.CampaignCard key={campaign.exp_id}>
              <S.CampaignImage src={CampaignDetail[0].image_urls[0]} alt={campaign.title} /> {/* Placeholder */}
              <S.CampaignInfo>
                <S.CampaignTitle>{campaign.title}</S.CampaignTitle>
                <S.CampaignDescription>일정: {campaign.schedule}</S.CampaignDescription>
              </S.CampaignInfo>
              <S.CampaignStatusInfo>
                <S.StatusItem>
                  <S.StatusLabel>상태</S.StatusLabel>
                  <S.StatusValue>{campaign.process_status}</S.StatusValue>
                </S.StatusItem>
              </S.CampaignStatusInfo>
            </S.CampaignCard>
          ))
        ) : (
          <p>종료된 캠페인이 없습니다.</p>
        )}
      </S.CampaignList>
    </S.FinishedCampaignsContainer>
  );
};

export default FinishedCampaigns;