import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CampaignCard from "components/Campaign/CampaignCard";
import * as S from "styles/main";
import { getExperienceListApi } from "apis/experience";
import { type Experience } from "types/apis/experience";

export default function Search() {
  const [searchResults, setSearchResults] = useState<Experience[]>([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get("keyword");

    if (keyword) {
      const fetchSearchResults = async () => {
        try {
          const response = await getExperienceListApi({ keyword: keyword });
          if (response.status === "success" && response.data.length > 0) {
            setSearchResults(response.data);
          } else {
            setSearchResults([]); // No results found
          }
        } catch (error) {
          console.error("Failed to fetch search results:", error);
          setSearchResults([]);
        }
      };
      fetchSearchResults();
    } else {
      setSearchResults([]); // No keyword, no results
    }
  }, [location.search]);

  return (
    <>
      <S.TitleBox>
        <h2>'{new URLSearchParams(location.search).get("keyword")}' 검색 결과</h2>
      </S.TitleBox>
      <S.CampaignGrid>
        {searchResults.length > 0 ? (
          searchResults.map((campaign, index) => (
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
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </S.CampaignGrid>
    </>
  );
}
