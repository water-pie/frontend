import CampaignCard from "components/Campaign/CampaignCard";
import * as S from "styles/main";
import { campaigns } from "mocks/campaign";

export default function Main() {
  return (
    <>
      <S.TitleBox>
        <h2>인기 체험단</h2>
      </S.TitleBox>
      <S.CampaignGrid>
        {campaigns.map((campaign, index) => (
          <CampaignCard
            key={index}
            id={campaign.id}
            image_urls={campaign.image_urls}
            title={campaign.title}
            offer_content={campaign.offer_content}
            applicated_num={campaign.applicated_num}
            member_num={campaign.member_num}
            chennels={campaign.chennals}
            possible_time_application={campaign.possible_time_application}
            product_offer_type={campaign.product_offer_type}
          />
        ))}
      </S.CampaignGrid>
    </>
  );
};