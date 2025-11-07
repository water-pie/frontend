import { useNavigate } from "react-router-dom";
import * as S from "styles/campaign/creation";
import { Input } from "components/Input/Input";
import { useCampaignCreationStore } from "store/useCampaignCreationStore";

const channels = [
  { id: "blog", label: "블로그", description: "블로그 게시물 1건 업로드" },
  { id: "instagram-feed", label: "인스타그램 - 피드", description: "사진 3장 이상의 피드 게시물 1개 업로드" },
  { id: "naver-clip", label: "네이버 클립", description: "30초 이상의 영상(클립) 1개 업로드" },
  { id: "instagram-reels", label: "인스타그램 - 릴스", description: "30초 이상의 영상(릴스) 1개 업로드" },
  { id: "youtube", label: "유튜브", description: "3분 이상의 영상(유튜브) 1개 업로드" },
  { id: "tiktok", label: "틱톡", description: "30초 이상의 영상(틱톡) 1개 업로드" },
  { id: "youtube-shorts", label: "유튜브 - 쇼츠", description: "30초 이상의 영상(유튜브 쇼츠) 1개 업로드" },
];

const CampaignCreationStep2Page = () => {
  const navigate = useNavigate();
  const promotionType = useCampaignCreationStore(state => state.promotionType);
  const address = useCampaignCreationStore(state => state.address);
  const detail_address = useCampaignCreationStore(state => state.detail_address);
  const product_url = useCampaignCreationStore(state => state.product_url);
  const category = useCampaignCreationStore(state => state.category);
  const selectedChannels = useCampaignCreationStore(state => state.channels);
  const set = useCampaignCreationStore(state => state.set);

  const steps = [
    { id: 1, label: "기본 정보" },
    { id: 2, label: "홍보 유형 및 카테고리와 채널" },
    { id: 3, label: "체험 가능 요일 및 시간" },
    { id: 4, label: "키워드 및 설명" },
    { id: 5, label: "제공 내역 및 포인트 결제" },
  ];
  const activeStep = 2;

  const handleChannelChange = (channelId: string) => {
    const newChannels = selectedChannels.includes(channelId)
      ? selectedChannels.filter((id) => id !== channelId)
      : [...selectedChannels, channelId].slice(0, 2);
    set({ channels: newChannels });
  };

  const canProceed = (() => {
    if (!promotionType) return false;
    if ((promotionType === "visiting" || promotionType === "take-out") && (!address || !detail_address)) return false;
    if ((promotionType === "shipping" || promotionType === "purchase") && !product_url) return false;
    if (!category) return false;
    if (selectedChannels.length === 0) return false;
    return true;
  })();

  const handleNextStep = () => {
    if (canProceed) {
      navigate("/campaign/creation/step3");
    } else {
      alert("모든 필수 항목을 입력하거나 선택해주세요.");
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
          <h3>홍보 유형 *</h3>
          <S.PromotionTypeGroup>
            <S.PromotionTypeBox
              selected={promotionType === "visiting"}
              onClick={() => set({ promotionType: "visiting" })}
            >
              <div>🏠</div>
              <h4>방문형</h4>
              <p>매장을 방문하고 체험 후 리뷰 작성</p>
            </S.PromotionTypeBox>
            <S.PromotionTypeBox
              selected={promotionType === "take-out"}
              onClick={() => set({ promotionType: "take-out" })}
            >
              <div>🛍️</div>
              <h4>포장형</h4>
              <p>방문 후 포장하여 리뷰 작성</p>
            </S.PromotionTypeBox>
            <S.PromotionTypeBox
              selected={promotionType === "shipping"}
              onClick={() => set({ promotionType: "shipping" })}
            >
              <div>📦</div>
              <h4>배송형</h4>
              <p>배송받은 제품 사용 후 리뷰 작성</p>
            </S.PromotionTypeBox>
            <S.PromotionTypeBox
              selected={promotionType === "purchase"}
              onClick={() => set({ promotionType: "purchase" })}
            >
              <div>🛒</div>
              <h4>구매형</h4>
              <p>제품 구매 후 리뷰, 구매평 리뷰 작성</p>
            </S.PromotionTypeBox>
          </S.PromotionTypeGroup>
        </S.FormSection>

        {(promotionType === "visiting" || promotionType === "take-out") && (
          <S.FormSection>
            <h3>주소 *</h3>
            <Input placeholder="예) 판교역로 167, 분당 주공211, 분평동 123" value={address} onChange={(e) => set({ address: e.target.value })} />
            <h3></h3>
            <Input placeholder="상세 주소를 입력해주세요." value={detail_address} onChange={(e) => set({ detail_address: e.target.value })} />
          </S.FormSection>
        )}

        {(promotionType === "shipping" || promotionType === "purchase") && (
          <S.FormSection>
            <h3>제품 URL *</h3>
            <Input placeholder="제공 내역 상세페이지와 일치하는 URL을 입력해주세요." value={product_url} onChange={(e) => set({ product_url: e.target.value })} />
          </S.FormSection>
        )}

        <S.FormSection>
          <h3>카테고리 *</h3>
          <S.Select value={category} onChange={(e) => set({ category: e.target.value }) }>
            <option value="">선택</option>
            <option value="맛집/카페">맛집/카페</option>
            <option value="뷰티">뷰티</option>
            <option value="숙박">숙박</option>
            <option value="문화">문화</option>
            <option value="기타">기타</option>
          </S.Select>
        </S.FormSection>

        <S.FormSection>
          <h3>채널 (최대 2개 선택 가능) *</h3>
          <S.ChannelGroup>
            {channels.map((channel) => (
              <S.ChannelBox key={channel.id}>
                <input
                  type="checkbox"
                  id={channel.id}
                  checked={selectedChannels.includes(channel.id)}
                  onChange={() => handleChannelChange(channel.id)}
                />
                <label htmlFor={channel.id}>
                  {channel.label}
                  <p>{channel.description}</p>
                </label>
              </S.ChannelBox>
            ))}
          </S.ChannelGroup>
        </S.FormSection>

        <S.ButtonGroup>
          <S.PrevButton onClick={() => navigate("/campaign/creation/step1")}>← 이전</S.PrevButton>
          <S.SubmitButton onClick={handleNextStep}>다음 단계 →</S.SubmitButton>
        </S.ButtonGroup>
      </S.RightPanel>
    </S.Wrapper>
  );
};

export default CampaignCreationStep2Page;