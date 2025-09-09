import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { CampaignData } from 'mocks/campaign';
import { campaigns } from 'mocks/campaign';
import VisitingPage from './Visiting';
import BuyingPage from './Buying';

export default function CampaignPage() {
  const { id } = useParams<{ id: string }>();
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null);

  useEffect(() => {
    const mockData = campaigns.find(campaign => campaign.id.toString() === id);
    setCampaignData(mockData || null);
  }, [id]);

  if (!campaignData) {
    return <div>Loading...</div>;
  }

  switch (campaignData.product_offer_type) {
    case 1: // 방문형
    case 2: // 포장형
      return <VisitingPage />;
    case 3: // 배송형
    case 4: // 구매형
      return <BuyingPage />;
    default:
      return <VisitingPage />; // 기본값으로 방문형 처리
  }
};