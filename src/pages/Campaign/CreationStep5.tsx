import * as S from "styles/campaign/creation";
import { Input } from "components/Input/Input";
import { useNavigate } from "react-router-dom";
import { useCampaignCreationStore } from "store/useCampaignCreationStore";
import useUserStore from "store/useUserStore";
import { registerExperienceApi } from "apis/manage";
import { type RegisterExperienceRequest } from "types/apis/manage";
import { useEffect, useState } from "react";
import { getUserInfoApi } from "apis/user";
import PointChargeModal from "components/Modal/PointChargeModal";

const CampaignCreationPage = () => {
  const steps = [
    { id: 1, label: "기본 정보" },
    { id: 2, label: "홍보 유형 및 카테고리와 채널" },
    { id: 3, label: "체험 가능 요일 및 시간" },
    { id: 4, label: "키워드 및 설명" },
    { id: 5, label: "제공 내역 및 포인트 결제" },
  ];
  const activeStep = 5;
  const navigate = useNavigate();
  const campaignData = useCampaignCreationStore(state => state);
  const { userInfo } = useUserStore();
  const [userInfoData, setUserInfoData] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUserInfo = async () => {
    if (userInfo?.token) {
      try {
        const response = await getUserInfoApi(userInfo.token);
        setUserInfoData(response.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [userInfo?.token]);
  
  const { offer_content, member_num, each_member_point, set } = campaignData;

  const totalPoints = member_num * each_member_point;
  const fee = totalPoints * 0.2;
  const requiredPoints = totalPoints + fee;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchUserInfo();
  };

  const handleSubmit = async () => {
    if (!userInfo?.token) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!offer_content || member_num <= 0) {
      alert("제공 내역과 모집 인원을 올바르게 입력해주세요.");
      return;
    }

    if (totalPoints > userInfoData.points) {
      alert("포인트를 충전해주세요.");
      return;
    }

    if (!campaignData.president_image) {
      alert("대표 이미지를 등록해주세요.");
      return;
    }

    if (!campaignData.application_start_date || !campaignData.application_end_date) {
      alert("체험단 신청 기간을 입력해주세요.");
      return;
    }

    if (!campaignData.member_announcement_time) {
      alert("인플루언서 선정일을 입력해주세요.");
      return;
    }

    if (!campaignData.experience_start_date || !campaignData.experience_end_date) {
      alert("체험단 진행 기간을 입력해주세요.");
      return;
    }

    if (!campaignData.end_review_time) {
      alert("리뷰 마감일을 입력해주세요.");
      return;
    }

    if (0 < each_member_point && each_member_point < 5000) {
      alert("5000P 이상 입력해주세요.");
      return;
    }

    // This is an assumed mapping.
    const channelMapping: { [key: string]: number } = {
      blog: 1,
      "instagram-feed": 2,
      "naver-clip": 3,
      "instagram-reels": 4,
      youtube: 5,
      tiktok: 6,
      "youtube-shorts": 7,
    };

    const dayMapping: { [key: string]: number } = {
      일: 0,
      월: 1,
      화: 2,
      수: 3,
      목: 4,
      금: 5,
      토: 6,
    };

    const promotionTypeMapping: {
      visiting: 1;
      "take-out": 2;
      shipping: 3;
      purchase: 4;
    } = {
      visiting: 1,
      "take-out": 2,
      shipping: 3,
      purchase: 4,
    };

    const requestData: RegisterExperienceRequest = {
      data_type: campaignData.promotionType === "shipping" || campaignData.promotionType === "purchase" ? 2 : 1,
      company_name: campaignData.company_name,
      manager_call_num: campaignData.manager_call_num,
      product_offer_type: promotionTypeMapping[campaignData.promotionType as keyof typeof promotionTypeMapping],
      address: campaignData.address,
      detail_address: campaignData.detail_address,
      category: campaignData.category, // Corrected typo
      product_url: campaignData.product_url,
      channels: campaignData.channels.map((ch) => channelMapping[ch]),
      possible_time_application: [campaignData.application_start_date, campaignData.application_end_date],
      member_announcement_time: campaignData.member_announcement_time,
      experience_time: [campaignData.experience_start_date, campaignData.experience_end_date],
      end_review_time: campaignData.end_review_time,
      possible_time: [campaignData.available_time_start, campaignData.available_time_end],
      possible_week_days: campaignData.available_days.map((day) => dayMapping[day]),
      possible_visit_now: campaignData.possible_visit_now,
      notices_to_visit: campaignData.notices_to_visit,
      experience_mission: campaignData.mission,
      marketing_keywords: campaignData.keywords,
      title: campaignData.title,
      offer_content: campaignData.offer_content,
      member_num: campaignData.member_num,
      each_member_point: campaignData.each_member_point,
      charge: fee,
    };

    try {
      await registerExperienceApi(requestData, campaignData.president_image, campaignData.images, userInfo.token);
      alert("체험단이 성공적으로 등록되었습니다.");
      campaignData.reset();
      navigate("/business");
    } catch (error) {
      console.error(error);
      alert("체험단 등록에 실패했습니다.");
    }
  };

  return (
    <S.Wrapper>
      <S.LeftPanel>
        <h2>캠페인 등록</h2>
        <S.StepIndicator>
          {steps.map((step) => (
            <S.StepItem key={step.id} active={step.id === activeStep} completed={step.id < activeStep}>
              <S.StepCircle active={step.id === activeStep} completed={step.id < activeStep}>
                {step.id < activeStep ? "✓" : step.id}
              </S.StepCircle>
              <S.StepLabel active={step.id === activeStep}>{step.label}</S.StepLabel>
            </S.StepItem>
          ))}
        </S.StepIndicator>
      </S.LeftPanel>
      <S.RightPanel>
        <S.FormSection>
          <h3>제공 내역 *</h3>
          <p>키워드를 명확하게 5가지를 선택해서 작성해 주세요.</p>
          <S.FullWidthTextarea
            placeholder="예) 5만원 식사권, 4만원 식사권(신메뉴 1개 필수)"
            value={offer_content}
            onChange={(e) => set({ offer_content: e.target.value })}
          />
          <S.Warning>가격과 품목을 명확히 표기하지 않으면 반려되니 주의하세요.</S.Warning>
        </S.FormSection>

        <S.FormSection>
          <h3>체험단 모집 인원 *</h3>
          <S.InputGroup>
            <Input placeholder="" type="number" value={member_num} onChange={(e) => set({ member_num: Number(e.target.value) })} />
            <span>명</span>
          </S.InputGroup>
        </S.FormSection>

        <S.FormSection>
          <h3>1인당 지급할 포인트</h3>
          <p>포인트 지급을 안하거나 5000P 이상 입력하셔야 합니다.</p>
          <p>실제 포인트 차감은 인플루언서의 리뷰를 승인하면 차감됩니다.</p>
          <S.InputGroup>
            <Input placeholder="0" type="number" value={each_member_point} onChange={(e) => set({ each_member_point: Number(e.target.value) })} />
            <span>포인트</span>
          </S.InputGroup>
          <S.PurchaseWarning>구매평리뷰는 구매 단가 이상으로 포인트를 지급해주셔야합니다.</S.PurchaseWarning>
        </S.FormSection>

        <S.SummaryBox>
          <S.SummaryRow>
            <span>홍보 유형</span>
            <span>{campaignData.promotionType}</span>
          </S.SummaryRow>
          <S.SummaryRow>
            <span>모집 채널</span>
            <span>{campaignData.channels.join(", ")}</span>
          </S.SummaryRow>
          <S.SummaryRow>
            <span>모집 인원</span>
            <span>{member_num} 명</span>
          </S.SummaryRow>
          <S.SummaryRow>
            <span>체험단 비용</span>
            <span>{totalPoints} P</span>
          </S.SummaryRow>
          <S.SummaryRow>
            <span>수수료 (20%)</span>
            <span>{fee} P</span>
          </S.SummaryRow>
          <S.SummaryRow className="total">
            <span>필요 포인트</span>
            <span>{requiredPoints} P</span>
          </S.SummaryRow>
        </S.SummaryBox>

        <S.PointInfo>
          <div>
            <p>보유 포인트: {userInfoData.points} P</p>
            { userInfoData.points - requiredPoints > 0
              ? <p>결제 후 포인트: {userInfoData.points - requiredPoints} P</p>
              : <p>부족한 포인트: {requiredPoints - userInfoData.points} P</p>
            }
          </div>
          <button onClick={handleOpenModal}>충전하기</button>
        </S.PointInfo>

        <S.ButtonGroup>
          <S.PrevButton onClick={() => navigate("/campaign/creation/step4")}>← 이전</S.PrevButton>
          <S.SubmitButton onClick={handleSubmit}>체험단 등록</S.SubmitButton>
        </S.ButtonGroup>
      </S.RightPanel>
      {isModalOpen && <PointChargeModal onClose={handleCloseModal} />}
    </S.Wrapper>
  );
};

export default CampaignCreationPage;