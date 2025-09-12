import * as S from "styles/campaign/card"
import { useNavigate } from "react-router-dom";
import { blog, insta, tiktok, youtube } from "utils/importing";

// Mapping for channel numbers to icon paths
const channelIconMap: { [key: number]: string } = {
  1: blog,
  2: insta,
  3: tiktok,
  4: youtube,
};

// Helper function to calculate remaining days
const calculateRemainingDays = (endDateStr: string): number => {
  const endDate = new Date(endDateStr);
  const today = new Date();
  // Reset time part to compare dates only
  endDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

interface Props {
  id: number,
  image_urls: string[],
  title: string,
  offer_content: string;
  applicated_num: number;
  member_num: number;
  chennels: number[];
  possible_time_application: [string, string];
};

const CampaignCard = ({
  id, image_urls, title, offer_content, applicated_num, member_num, chennels, possible_time_application
}: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/campaign/${id}`);
  };

  const remainingDays = possible_time_application
    ? calculateRemainingDays(possible_time_application[1])
    : 0;

  return (
    <S.Card onClick={handleClick}>
      <S.Image src={image_urls && image_urls.length > 0 ? image_urls[0] : ""} alt={title} />
      <S.Content>
        <S.Top>
          {(chennels || []).map((channelId) => (
            <img key={channelId} src={channelIconMap[channelId]} alt={title} />
          ))}
          <S.Limit>{remainingDays}일 남음</S.Limit>
        </S.Top>
        <S.DescriptionBox>
          <S.Title>{title}</S.Title>
          <S.Description>{offer_content}</S.Description>
        </S.DescriptionBox>
        <S.Status>
          <span>신청 {applicated_num}명</span>
          <S.LimitStatus>/</S.LimitStatus>
          <S.LimitStatus>모집 {member_num}명</S.LimitStatus>
        </S.Status>
      </S.Content>
    </S.Card>
  );
};

export default CampaignCard;
