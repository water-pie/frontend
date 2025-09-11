import { useState } from 'react';
import * as S from 'styles/my/ongoingCampaigns';
import { campaigns } from 'mocks/campaign';
import ReviewRegistrationModal from 'components/Modal/ReviewRegistrationModal';
import type { CampaignItem } from 'types/campaign';

const ongoingCampaigns: CampaignItem[] = [
  {
    id: 1,
    image: campaigns[0].image_urls[0],
    title: campaigns[0].title,
    offerContent: campaigns[0].offer_content,
    mission: '릴스 1회 업로드',
    missionDeadline: '2025.08.31',
    status: '리뷰 등록',
  },
  {
    id: 2,
    image: campaigns[0].image_urls[0],
    title: campaigns[0].title,
    offerContent: campaigns[0].offer_content,
    mission: '릴스 1회 업로드',
    missionDeadline: '2025.08.31',
    status: '리뷰 등록',
  },
  {
    id: 3,
    image: campaigns[0].image_urls[0],
    title: campaigns[0].title,
    offerContent: campaigns[0].offer_content,
    mission: '릴스 1회 업로드',
    missionDeadline: '2025.08.31',
    status: '리뷰 등록',
  },
  {
    id: 4,
    image: campaigns[0].image_urls[0],
    title: campaigns[0].title,
    offerContent: campaigns[0].offer_content,
    mission: '릴스 1회 업로드',
    missionDeadline: '2025.08.31',
    status: '리뷰 등록',
  },
  {
    id: 5,
    image: campaigns[0].image_urls[0],
    title: campaigns[0].title,
    offerContent: campaigns[0].offer_content,
    mission: '릴스 1회 업로드',
    missionDeadline: '2025.08.31',
    status: '리뷰 등록',
  },
];

const OngoingCampaigns = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignItem | null>(null);

  const handleRegisterReview = (campaignId: number) => {
    const campaignToOpen = ongoingCampaigns.find(c => c.id === campaignId);
    if (campaignToOpen) {
      setSelectedCampaign(campaignToOpen);
      setIsModalOpen(true);
    }
  };

  return (
    <S.OngoingCampaignsContainer>
      <S.Title>진행중인 캠페인</S.Title>
      <S.CampaignList>
        {ongoingCampaigns.map((campaign) => (
          <S.CampaignCard key={campaign.id}>
            <S.CampaignImage src={campaign.image} alt={campaign.title} />
            <S.CampaignInfo>
              <S.CampaignTitle>{campaign.title}</S.CampaignTitle>
              <S.CampaignDescription>{campaign.offerContent}</S.CampaignDescription>
            </S.CampaignInfo>
            <S.CampaignStatusInfo>
              <S.StatusItem>
                <S.StatusLabel>미션</S.StatusLabel>
                <S.StatusValue>{campaign.mission}</S.StatusValue>
              </S.StatusItem>
              <S.StatusItem>
                <S.StatusLabel>미션 마감일</S.StatusLabel>
                <S.StatusValue>{campaign.missionDeadline}</S.StatusValue>
              </S.StatusItem>
              <S.StatusItem>
                <S.StatusLabel>캠페인 상태</S.StatusLabel>
                <S.StatusButton onClick={() => handleRegisterReview(campaign.id)}>
                  {campaign.status}
                </S.StatusButton>
              </S.StatusItem>
            </S.CampaignStatusInfo>
          </S.CampaignCard>
        ))}
      </S.CampaignList>

      {isModalOpen && selectedCampaign && (
        <ReviewRegistrationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          campaignDetails={selectedCampaign}
        />
      )}
    </S.OngoingCampaignsContainer>
  );
};

export default OngoingCampaigns;