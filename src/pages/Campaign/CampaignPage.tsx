import { useLocation } from 'react-router-dom';
import VisitingPage from './Visiting';
import BuyingPage from './Buying';

export default function CampaignPage() {
  const location = useLocation();
  const { product_offer_type } = location.state as { product_offer_type: number };
  
  switch (product_offer_type) {
    case 3: // 배송형
    case 4: // 구매형
      return <BuyingPage />;
    default:
      return <VisitingPage />; // 기본값으로 방문형 처리
  }
};