
import * as S from 'styles/my/finishedCampaigns';
import { campaigns } from 'mocks/campaign';
import type { CampaignItem } from 'types/campaign';

const finishedCampaigns: CampaignItem[] = [
  {
    id: 1,
    image: campaigns[0].image_urls[0],
    title: campaigns[0].title,
    offerContent: campaigns[0].offer_content,
    mission: '릴스 1회 업로드',
    missionDeadline: '2025.08.31',
    status: '리뷰 등록 완료',
  },
  {
    id: 2,
    image: campaigns[0].image_urls[0],
    title: campaigns[0].title,
    offerContent: campaigns[0].offer_content,
    mission: '릴스 1회 업로드',
    missionDeadline: '2025.08.31',
    status: '리뷰 등록 완료',
  },
  {
    id: 3,
    image: campaigns[0].image_urls[0],
    title: campaigns[0].title,
    offerContent: campaigns[0].offer_content,
    mission: '릴스 1회 업로드',
    missionDeadline: '2025.08.31',
    status: '리뷰 등록 완료',
  },
  {
    id: 4,
    image: campaigns[0].image_urls[0],
    title: campaigns[0].title,
    offerContent: campaigns[0].offer_content,
    mission: '릴스 1회 업로드',
    missionDeadline: '2025.08.31',
    status: '리뷰 등록 완료',
  },
  {
    id: 5,
    image: campaigns[0].image_urls[0],
    title: campaigns[0].title,
    offerContent: campaigns[0].offer_content,
    mission: '릴스 1회 업로드',
    missionDeadline: '2025.08.31',
    status: '리뷰 등록 완료',
  },
];

const FinishedCampaigns = () => {
  return (
    <S.FinishedCampaignsContainer>
      <S.Title>종료된 캠페인</S.Title>
      <S.CampaignList>
        {finishedCampaigns.map((campaign) => (
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
                <S.StatusButton disabled>
                  {campaign.status}
                </S.StatusButton>
              </S.StatusItem>
            </S.CampaignStatusInfo>
          </S.CampaignCard>
        ))}
      </S.CampaignList>
    </S.FinishedCampaignsContainer>
  );
};

export default FinishedCampaigns;