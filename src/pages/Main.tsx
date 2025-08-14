import ProductCard from "components/Campaign/CampaignCard";
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
          <ProductCard
            key={index}
            image={campaign.image}
            title={campaign.title}
            description={campaign.description}
            status={campaign.status}
            limit={campaign.limitPerson}
            remainingDays={campaign.remainingDays}
            type={campaign.type}
          />
        ))}
      </S.CampaignGrid>
    </>
  );
};