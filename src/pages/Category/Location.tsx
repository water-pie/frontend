import ProductCard from "components/Campaign/CampaignCard";
import * as S from "styles/main";
import { campaigns } from "mocks/campaign";
import Categories from "components/Category/Categories";
import { useState } from "react";
import styled from "@emotion/styled";
import LocationFilter from "components/Category/LocationFilter";

export default function Location() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <S.TitleBox>
        <h2>지역 체험단</h2>
        <ModalText
          onClick={() => setIsOpen(true)}
        >
          전체
        </ModalText>
        {isOpen && <LocationFilter onClose={() => setIsOpen(false)}/>}
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
};

const ModalText = styled.span`
  cursor: pointer;
`