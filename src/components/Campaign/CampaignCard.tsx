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

interface Props {
  id: number,
  image_urls: string[],
  title: string,
  offer_content: string;
  applicated_num: number;
  member_num: number;
  channels: number[];
  possible_time_application_left: number;
  product_offer_type: 1 | 2 | 3 | 4;
};

const CampaignCard = ({
  id, image_urls, title, offer_content, applicated_num, member_num, channels, possible_time_application_left, product_offer_type
}: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/campaign/${id}`, { state: { product_offer_type } });
  };

  const remainingDays = possible_time_application_left;

  return (
    <S.Card onClick={handleClick}>
      <S.Image src={image_urls && image_urls.length > 0 ? image_urls[0] : ""} alt={title} />
      <S.Content>
        <S.Top>
          {(channels || []).map((channelId) => (
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
