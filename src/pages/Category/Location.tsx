import CampaignCard from "components/Campaign/CampaignCard";
import * as S from "styles/main";
import { cardMocks } from "mocks/campaign";
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
        {cardMocks.map((campaign, index) => (
          <CampaignCard
            key={index}
            id={campaign.id}
            image_urls={campaign.image_urls}
            title={campaign.title}
            offer_content={campaign.offer_content}
            applicated_num={campaign.applicated_num}
            member_num={campaign.member_num}
            channels={campaign.channels}
            possible_time_application_left={campaign.possible_time_application_left}
            product_offer_type={campaign.product_offer_type}
          />
        ))}
      </S.CampaignGrid>
    </>
  )
};

const ModalText = styled.span`
  cursor: pointer;
`