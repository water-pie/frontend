import CampaignCard from "components/Campaign/CampaignCard";
import * as S from "styles/main";
import Categories from "components/Category/Categories";
import { useEffect, useState } from "react";
import { getExperienceListApi } from "apis/experience";
import { type Experience } from "types/apis/experience";

export default function Promotion() {
  const [campaigns, setCampaigns] = useState<Experience[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<{ category: string; channels: number[] }>({ category: '전체', channels: [] });

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const params: {
          keyword?: string,
          channels?: number[]
        } = { keyword: "기자단" };

        if (categoryFilters.channels.length > 0) {
          params.channels = categoryFilters.channels;
        }

        const response = await getExperienceListApi(params);
        setCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching promotion campaigns:", error);
      }
    };

    fetchCampaigns();
  }, [categoryFilters]);

  return (
    <>
      <S.TitleBox>
        <h2>기자단 모집</h2>
      </S.TitleBox>
      <Categories onList={false} onFilterChange={setCategoryFilters} />
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
}