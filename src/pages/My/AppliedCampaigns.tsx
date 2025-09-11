import * as S from 'styles/my/appliedCampaigns';
import { campaigns } from 'mocks/campaign';
import type { CampaignItem } from 'types/campaign';

const appliedCampaigns: CampaignItem[] = [
  {
    id: 1,
    image: campaigns[0].image_urls[0],
    title: campaigns[0].title,
    offerContent: campaigns[0].offer_content,
    selectionDate: '2025.08.31',
    status: '선정 진행중',
  },
  {
    id: 2,
    image: campaigns[0].image_urls[0],
    title: campaigns[0].title,
    offerContent: campaigns[0].offer_content,
    selectionDate: '2025.08.31',
    status: '선정 진행중',
  },
  {
    id: 3,
    image: campaigns[0].image_urls[0],
    title: campaigns[0].title,
    offerContent: campaigns[0].offer_content,
    selectionDate: '2025.08.31',
    status: '선정 진행중',
  },
  {
    id: 4,
    image: campaigns[0].image_urls[0],
    title: campaigns[0].title,
    offerContent: campaigns[0].offer_content,
    selectionDate: '2025.08.31',
    status: '선정 진행중',
  },
  {
    id: 5,
    image: campaigns[0].image_urls[0],
    title: campaigns[0].title,
    offerContent: campaigns[0].offer_content,
    selectionDate: '2025.08.31',
    status: '선정 진행중',
  },
];

const AppliedCampaigns = () => {
  return (
    <S.AppliedCampaignsContainer>
      <S.Title>신청한 캠페인</S.Title>
      <S.CampaignList>
        {appliedCampaigns.map((campaign) => (
          <S.CampaignCard key={campaign.id}>
            <S.CampaignImage src={campaign.image} alt={campaign.title} />
            <S.CampaignInfo>
              <S.CampaignTitle>{campaign.title}</S.CampaignTitle>
              <S.CampaignDescription>{campaign.offerContent}</S.CampaignDescription>
            </S.CampaignInfo>
            <S.CampaignStatusInfo>
              <S.StatusItem>
                <S.StatusLabel>인플루언서 선정일</S.StatusLabel>
                <S.StatusValue>{campaign.selectionDate}</S.StatusValue>
              </S.StatusItem>
              <S.StatusItem>
                <S.StatusLabel>캠페인 상태</S.StatusLabel>
                <S.StatusValue>{campaign.status}</S.StatusValue>
              </S.StatusItem>
            </S.CampaignStatusInfo>
          </S.CampaignCard>
        ))}
      </S.CampaignList>
    </S.AppliedCampaignsContainer>
  );
};

export default AppliedCampaigns;