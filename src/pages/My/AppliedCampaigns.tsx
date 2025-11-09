import { useState, useEffect } from 'react';
import * as S from 'styles/my/appliedCampaigns';
import { CampaignDetail } from 'mocks/campaign';
import { getOngoingExperiencesApi, cancelExperienceApi } from 'apis/experience';
import useUserStore from 'store/useUserStore';

interface AppliedCampaign {
  exp_id: number;
  title: string;
  schedule: string;
  process_status: number;
}

const statusMapping: { [key: number]: string } = {
  1: "선정중",
  2: "리뷰등록하기",
  3: "리뷰 거절",
  4: "선정 거절",
  5: "취소",
  6: "과정 완료",
};

const AppliedCampaigns = () => {
  const { userInfo } = useUserStore();
  const [appliedCampaigns, setAppliedCampaigns] = useState<AppliedCampaign[]>([]);

  const fetchAppliedCampaigns = async () => {
    if (!userInfo?.token) return;
    try {
      const response = await getOngoingExperiencesApi(userInfo.token);
      if (response.status === "success" && response.data) {
        setAppliedCampaigns(response.data);
      } else {
        setAppliedCampaigns([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAppliedCampaigns();
  }, [userInfo?.token]);

  const handleCancelApplication = async (campaignId: number) => {
    if (!userInfo?.token) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (window.confirm("정말로 신청을 취소하시겠습니까?")) {
      try {
        const response = await cancelExperienceApi(campaignId, userInfo.token);
        if (response.status === "success") {
          alert("신청이 취소되었습니다.");
          fetchAppliedCampaigns(); // Refresh the list
        } else {
          alert(`신청 취소 실패: ${response.message}`);
        }
      } catch (error) {
        console.error("에러")
      }
    }
  };

  return (
    <S.AppliedCampaignsContainer>
      <S.Title>신청한 캠페인</S.Title>
      <S.CampaignList>
        {appliedCampaigns.length > 0 ? (
          appliedCampaigns.map((campaign) => (
            <S.CampaignCard key={campaign.exp_id}>
              {/* Assuming image and offerContent are not directly in AppliedCampaign, 
                  you might need to fetch full campaign details or adjust the type if needed */}
              <S.CampaignImage src={CampaignDetail[0].image_urls[0]} alt={campaign.title} /> {/* 이미지 추가 수정 */}
              <S.CampaignInfo>
                <S.CampaignTitle>{campaign.title}</S.CampaignTitle>
                <S.CampaignDescription>진행 상태: {statusMapping[campaign.process_status]}</S.CampaignDescription>
              </S.CampaignInfo>
              <S.CampaignStatusInfo>
                <S.StatusItem>
                  <S.StatusLabel>일정</S.StatusLabel>
                  <S.StatusValue>{campaign.schedule}</S.StatusValue>
                </S.StatusItem>
                <S.StatusItem>
                  <S.StatusLabel>상태</S.StatusLabel>
                  <S.StatusValue>{statusMapping[campaign.process_status]}</S.StatusValue>
                </S.StatusItem>
              </S.CampaignStatusInfo>
              <button onClick={() => handleCancelApplication(campaign.exp_id)}>신청 취소</button>
            </S.CampaignCard>
          ))
        ) : (
          <p>신청한 캠페인이 없습니다.</p>
        )}
      </S.CampaignList>
    </S.AppliedCampaignsContainer>
  );
};
export default AppliedCampaigns;