import CampaignCard from "components/Campaign/CampaignCard";
import * as S from "styles/main";
import { getExperienceListApi } from "apis/experience";
import { useEffect, useState } from "react";
import type { Experience } from "types/apis/experience";

export default function Main() {
  const [campaigns, setCampaigns] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const response = await getExperienceListApi();
      setCampaigns(response.data.length > 0 ? response.data : []);
    };

    fetchCampaigns();
  }, []);

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
            channels={campaign.channels}
            possible_time_application_left={campaign.possible_time_application_left}
            product_offer_type={campaign.product_offer_type}
          />
        ))}
      </S.CampaignGrid>
    </>
  );
};