import { useState, useEffect } from 'react';
import * as S from 'styles/campaign/visiting';
import * as S2 from 'styles/main';
import { productTypeMapping } from 'apis/Mapping/typeMapping';
import { useParams, useNavigate } from 'react-router-dom';
import { CampaignDetail, cardMocks } from 'mocks/campaign';
import CampaignCard from 'components/Campaign/CampaignCard';
import { insta } from 'utils/importing';
import { getExperienceDetailApi } from 'apis/experience';
import { type ExperienceDetail } from 'types/apis/experience';

export default function VisitingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaignData, setCampaignData] = useState<ExperienceDetail | null>(null);

  useEffect(() => {
    const fetchCampaignDetail = async () => {
      if (!id) return;
      try {
        const response = await getExperienceDetailApi(Number(id));
        if (response.status === "success" && response.data) {
          setCampaignData(response.data);
        } else {
          // Fallback to mock data if API returns no data or status is not success
          const mockData = CampaignDetail.find(campaign => campaign.id.toString() === id);
          setCampaignData(mockData as ExperienceDetail || null);
        }
      } catch (error) {
        console.error("Failed to fetch campaign detail:", error);
        // Fallback to mock data on API error
        const mockData = CampaignDetail.find(campaign => campaign.id.toString() === id);
        setCampaignData(mockData as ExperienceDetail || null);
      }
    };

    fetchCampaignDetail();
  }, [id]);

  if (!campaignData) {
    return <div>Loading...</div>;
  }

  // Helper to format dates
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit', weekday: 'short' });

  const handleApplyClick = () => {
    navigate(`/campaign/${id}/apply`); // Navigate to the application page
  };

  return (
    <>
      <S.Wrapper>
        {/* Left Content Section */}
        <S.LeftContent>
          {/* Title and Tags */}
          <S.Section>
            <h1>{campaignData.title}</h1>
            <S.TagContainer>
              <S.Tag>
                <img src={insta} alt="인스타" />
                인스타
              </S.Tag>
              <S.Tag>{productTypeMapping[campaignData.product_offer_type as keyof typeof productTypeMapping]}</S.Tag>
              <S.PointTag>
                {campaignData.each_member_point.toLocaleString()}P
              </S.PointTag>
            </S.TagContainer>
          </S.Section>

          {/* Host Information */}
          <S.Section>
            <S.SubSection>
              <h2>주최</h2>
              <span>{campaignData.writer}</span>
            </S.SubSection>
            <S.SubSection>
              <h2>제공 서비스/물품</h2>
              <span>{campaignData.offer_content}</span>
            </S.SubSection>
          </S.Section>

          {/* Visit Information */}
          <S.Section>
            <S.SubSection>
              <h2>방문 정보</h2>
              {/* Map API will be used here */}
              <S.MapPlaceholder>
                <span>지도 API 표시 영역</span>
              </S.MapPlaceholder>
            </S.SubSection>
            <S.SubSection>
              <h2>방문 위치</h2>
              <span>{campaignData.address}</span>
            </S.SubSection>
            <S.SubSection>
              <h2>방문 안내사항</h2>
              <S.InfoDiv>{campaignData.notices_to_visit}</S.InfoDiv>
            </S.SubSection>
          </S.Section>

          {/* Keywords */}
          <S.Section>
            <S.SubSection>
              <h2>키워드</h2>
              <S.KeywordContainer>
                {campaignData.marketing_keywords.map((keyword, index) => (
                  <S.Keyword key={index}>
                    {keyword}
                  </S.Keyword>
                ))}
              </S.KeywordContainer>
            </S.SubSection>
            {/* Mission */}
            <S.SubSection>
              <h2>체험단 미션</h2>
              <S.InfoDiv>
                <h2>인스타그램</h2>
                <S.TagContainer>
                  {["해시태그", "지도 첨부", "30초 이상", "협찬", "목소리 필수"].map(str => {
                    return (
                      <S.NoticeTag key={str}>{str}</S.NoticeTag>
                    )
                  })}
                </S.TagContainer>
                {campaignData.experience_mission}
              </S.InfoDiv>
            </S.SubSection>
          </S.Section>

          {/* Fair Trade Commission Notice */}
          <S.Section>
            <S.SubSection>
              <h2>공정위 문구 · 배너</h2>
              <S.Banner>
                <span>당첨된 이후 확인 가능</span>
              </S.Banner>
            </S.SubSection>
          </S.Section>
        </S.LeftContent>

        {/* Right Floating Card Section */}
        <S.RightContent>
          <S.StickyCard>
              {/* Cafe Image */}
              <S.CafeImage src={campaignData.image_urls[0]} alt="Cafe" />

              {/* Application Details */}
              <S.FloatingCard>
                <S.DetailRow>
                  <span>체험단 신청기간</span>
                  <span>{formatDate(campaignData.possible_time_application[0])} ~ {formatDate(campaignData.possible_time_application[1])}</span>
                </S.DetailRow>
                <S.DetailRow>
                  <span>인플루언서 선정</span>
                  <span>{formatDate(campaignData.member_announcement_time)}</span>
                </S.DetailRow>
                <S.DetailRow>
                  <span>체험단 진행기간</span>
                  <span>{formatDate(campaignData.experience_time[0])} ~ {formatDate(campaignData.experience_time[1])}</span>
                </S.DetailRow>
                <S.DetailRow>
                  <span>리뷰 마감</span>
                  <span>{formatDate(campaignData.end_review_time)}</span>
                </S.DetailRow>
                <S.DetailRow>
                  <span>신청 현황</span>
                  <span>{campaignData.applicated_num}명 / {campaignData.member_num}명</span>
                </S.DetailRow>

                {/* Apply Button */}
                <S.ApplyButton onClick={handleApplyClick}>
                  신청하기
                </S.ApplyButton>
              </S.FloatingCard>
          </S.StickyCard>
        </S.RightContent>
      </S.Wrapper>
      <S2.TitleBox>
        <h2>연관 체험단</h2>
      </S2.TitleBox>
      <S2.CampaignGrid>
        {cardMocks.slice(4).map((campaign, index) => (
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
      </S2.CampaignGrid>
    </>
  );
};