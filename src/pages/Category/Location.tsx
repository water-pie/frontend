import CampaignCard from "components/Campaign/CampaignCard";
import * as S from "styles/main";
import Categories from "components/Category/Categories";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import LocationFilter from "components/Category/LocationFilter";
import { getExperienceListApi } from "apis/experience";
import { type Experience, type GetExperienceListParams } from "types/apis/experience";

export default function Location() {
  const [isOpen, setIsOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<Experience[]>([]);
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [categoryFilters, setCategoryFilters] = useState<{ category: string; channels: number[] }>({ category: '전체', channels: [] });

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const params: GetExperienceListParams = { dataType: 2 };

        let keywordParts: string[] = [];
        if (locationFilter) {
          params.sigungu = locationFilter;
        }
        if (categoryFilters.category !== '전체') {
          params.category = categoryFilters.category;
        }
        if (keywordParts.length > 0) {
          params.keyword = keywordParts.join(' ');
        }

        if (categoryFilters.channels.length > 0) {
          params.channels = categoryFilters.channels;
        }

        const response = await getExperienceListApi(params);
        setCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching location campaigns:", error);
      }
    };

    fetchCampaigns();
  }, [locationFilter, categoryFilters]);

  return (
    <>
      <S.TitleBox>
        <h2>지역 체험단</h2>
        <ModalText
          onClick={() => setIsOpen(true)}
        >
          {locationFilter || '전체'}
        </ModalText>
        {isOpen && <LocationFilter currentLocation={locationFilter} onClose={() => setIsOpen(false)} onApply={setLocationFilter} />}
      </S.TitleBox>
      <Categories onFilterChange={setCategoryFilters} />
      <S.CampaignGrid>
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
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