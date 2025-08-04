import ProductCard from "components/Campaign/CampaignCard";
import * as S from "styles/main";
import { campaigns } from "mocks/campaign";
import Categories from "components/Category/Categories";

export default function Promotion() {
  return (
    <>
      <S.TitleBox>
        <h2>기자단 모집</h2>
      </S.TitleBox>
      <Categories />
      <S.CampaignGrid>
        {campaigns.map((campaign, index) => (
          <ProductCard
            key={index}
            image={campaign.image}
            title={campaign.title}
            status={campaign.status}
            limit={campaign.limitPerson}
            remainingDays={campaign.remainingDays}
            point={campaign.point}
            condition={campaign.condition}
            type={campaign.type}
          />
        ))}
      </S.CampaignGrid>
    </>
  )
}