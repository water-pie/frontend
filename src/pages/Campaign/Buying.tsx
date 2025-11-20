import { useState, useEffect } from 'react';
import * as S from 'styles/campaign/campaignDetail';
import { productTypeMapping } from 'apis/Mapping/typeMapping';
import { useParams, useNavigate } from 'react-router-dom';
import { CampaignDetail } from 'mocks/campaign';
import { insta, blog, tiktok, youtube } from 'utils/importing';
import { getExperienceDetailApi, checkExperienceApplicationApi } from 'apis/experience'; // Import checkExperienceApplicationApi
import { type ExperienceDetail } from 'types/apis/experience';
import useUserStore from 'store/useUserStore';

const channelInfo: { [key: number]: { name: string; icon: string } } = {
  1: { name: '블로그', icon: blog },
  2: { name: '인스타그램', icon: insta },
  3: { name: '네이버 클립', icon: blog }, // Replace with actual icon if available
  4: { name: '인스타그램 릴스', icon: insta },
  5: { name: '유튜브', icon: youtube },
  6: { name: '틱톡', icon: tiktok },
  7: { name: '유튜브 쇼츠', icon: youtube },
};

export default function BuyingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  const [campaignData, setCampaignData] = useState<ExperienceDetail | null>(null);
  const [hasApplied, setHasApplied] = useState(false); // New state for application status
  const [isApplicationPeriodOver, setIsApplicationPeriodOver] = useState(false); // Add this line

  useEffect(() => {
    const fetchCampaignDetail = async () => {
      if (!id) return;
      try {
        const response = await getExperienceDetailApi(Number(id));
        if (response.status === "success" && response.data) {
          setCampaignData(response.data);
          const applicationEndDate = new Date(response.data.possible_time_application[1]);
          const currentDate = new Date();
          setIsApplicationPeriodOver(currentDate > applicationEndDate); // Add this line
          // Check application status if user is logged in
          if (userInfo?.token) {
            const checkResponse = await checkExperienceApplicationApi(userInfo.token, Number(id));
            if (checkResponse.status === "success" && checkResponse.data.applied) {
              setHasApplied(true);
            }
          }
        } else {
          // Fallback to mock data if API returns no data or status is not success
          const mockData = CampaignDetail.find(campaign => campaign.id.toString() === id);
          setCampaignData(mockData as ExperienceDetail || null);
        }
      } catch (error) {
        console.error("Failed to fetch campaign detail or check application status:", error);
        // Fallback to mock data on API error
        const mockData = CampaignDetail.find(campaign => campaign.id.toString() === id);
        setCampaignData(mockData as ExperienceDetail || null);
      }
    };

    fetchCampaignDetail();
  }, [id, userInfo?.token]); // Add userInfo.token to dependencies

  if (!campaignData) {
    return <div>Loading...</div>;
  }

  // Helper to format dates
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit', weekday: 'short' });

  const handleApplyClick = () => {
    if (hasApplied) {
      alert("이미 신청한 캠페인입니다.");
      return;
    }

    if (userInfo && userInfo.token) {
      navigate(`/campaign/${id}/apply`, { state: { campaignData } });
    } else {
      alert("로그인 이후 체험단을 신청할 수 있습니다.");
      navigate(`/login`);
    }
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
              {campaignData.channels.map(channelId => (
                <S.Tag key={channelId}>
                  <img src={channelInfo[channelId]?.icon} alt={channelInfo[channelId]?.name} />
                  {channelInfo[channelId]?.name}
                </S.Tag>
              ))}
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

          {/* Product Information */}
          <S.Section>
            <S.SubSection>
              <h2>상품 정보</h2>
              <a href={campaignData.product_url} target="_blank" rel="noreferrer">{campaignData.product_url}</a>
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
            <S.SubSection>
              <h2>체험단 미션</h2>
              {campaignData.channels.map(channelId => (
                <S.InfoDiv key={channelId}>
                  <h2>{channelInfo[channelId]?.name}</h2>
                  <S.TagContainer>
                    {["해시태그", "지도 첨부", "30초 이상", "협찬", "목소리 필수"].map(str => {
                      return (
                        <S.NoticeTag key={str}>{str}</S.NoticeTag>
                      )
                    })}
                  </S.TagContainer>
                  {campaignData.experience_mission}
                </S.InfoDiv>
              ))}
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
                <S.ApplyButton onClick={handleApplyClick} disabled={hasApplied || isApplicationPeriodOver}>
                  {hasApplied ? "신청 완료" : (isApplicationPeriodOver ? "신청 기간 종료" : "신청하기")}
                </S.ApplyButton>
              </S.FloatingCard>
          </S.StickyCard>
        </S.RightContent>
      </S.Wrapper>
    </>
  );
};
