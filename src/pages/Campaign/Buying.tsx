import { useState, useEffect } from 'react';
import * as S from 'styles/campaign/visiting';
import * as S2 from 'styles/main';
import { productTypeMapping } from 'apis/Mapping/typeMapping';
import { useParams } from 'react-router-dom';
import type { CampaignData } from 'mocks/campaign';
import { campaigns } from 'mocks/campaign';
import CampaignCard from 'components/Campaign/CampaignCard';

export default function BuyingPage() {
  const { id } = useParams(); // id 파라미터 가져오기
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null);

  useEffect(() => {
    const mockData = campaigns.find(campaign => campaign.id.toString() === id);
    setCampaignData(mockData || null);
  }, [id]);

  if (!campaignData) {
    return <div>Loading...</div>;
  }

  // Helper to format dates
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit', weekday: 'short' });

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
                <img src="/insta.png" alt="인스타" />
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
                <S.ApplyButton>
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
        {campaigns.slice(4).map((campaign, index) => (
          <CampaignCard
            key={index}
            id={campaign.id}
            image_urls={campaign.image_urls}
            title={campaign.title}
            offer_content={campaign.offer_content}
            applicated_num={campaign.applicated_num}
            member_num={campaign.member_num}
            chennels={campaign.chennals}
            possible_time_application={campaign.possible_time_application}
          />
        ))}
      </S2.CampaignGrid>
    </>
  );
};
