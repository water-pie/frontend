import { useNavigate } from "react-router-dom";
import * as S from "styles/campaign/creation";
import { Input } from "components/Input/Input";
import { useCampaignCreationStore } from "store/useCampaignCreationStore";
import { useState } from "react";
import DaumPostModal from "components/Modal/DaumPostModal";

const channels = [
  { id: "블로그", description: "블로그 게시물 1건 업로드", necessaryPoint: false },
  { id: "인스타그램 - 피드", description: "사진 3장 이상의 피드 게시물 1개 업로드", necessaryPoint: false },
  { id: "네이버 클립", description: "30초 이상의 영상(클립) 1개 업로드", necessaryPoint: true },
  { id: "인스타그램 - 릴스", description: "30초 이상의 영상(릴스) 1개 업로드", necessaryPoint: true },
  { id: "유튜브", description: "3분 이상의 영상(유튜브) 1개 업로드", necessaryPoint: true },
  { id: "틱톡", description: "30초 이상의 영상(틱톡) 1개 업로드", necessaryPoint: true },
  { id: "유튜브 - 쇼츠", description: "30초 이상의 영상(유튜브 쇼츠) 1개 업로드", necessaryPoint: true },
];

const CampaignCreationStep2Page = () => {
  const navigate = useNavigate();
  const promotionType = useCampaignCreationStore(state => state.promotionType);
  const address = useCampaignCreationStore(state => state.address);
  const detail_address = useCampaignCreationStore(state => state.detail_address);
  const product_url = useCampaignCreationStore(state => state.product_url);
  const category = useCampaignCreationStore(state => state.category);
  const dataType = useCampaignCreationStore(state => state.dataType); // Import dataType
  const selectedChannels = useCampaignCreationStore(state => state.channels);
  const set = useCampaignCreationStore(state => state.set);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const handleAddressSelect = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    set({ address: fullAddress });
    setIsAddressModalOpen(false);
  }

  const steps = [
    { id: 1, label: "기본 정보" },
    { id: 2, label: "홍보 유형 및 카테고리와 채널" },
    { id: 3, label: "체험 가능 요일 및 시간" },
    { id: 4, label: "키워드 및 설명" },
    { id: 5, label: "제공 내역 및 포인트 결제" },
  ];
  const activeStep = 2;

  const dataTypeOptions = [
    { value: 1, label: "제품" },
    { value: 2, label: "지역" },
    { value: 3, label: "기자단" },
  ];

  const handleChannelChange = (channelId: string) => {
    const newChannels = selectedChannels.includes(channelId)
      ? selectedChannels.filter((id) => id !== channelId)
      : [...selectedChannels, channelId].slice(0, 2);
    
    const requiresPremium = newChannels.some(channelId => {
      const channel = channels.find(c => c.id === channelId);
      return channel?.necessaryPoint;
    });

    set({ channels: newChannels, requiresPremiumPoint: requiresPremium });
  };

  const canProceed = (() => {
    if (!promotionType) return false;
    if ((promotionType === "방문형" || promotionType === "포장형") && (!address || !detail_address)) return false;
    if ((promotionType === "배송형" || promotionType === "구매형") && !product_url) return false;
    if (!category) return false;
    if (!dataType) return false; // Add dataType validation
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
      {isAddressModalOpen && <DaumPostModal onComplete={handleAddressSelect} onClose={() => setIsAddressModalOpen(false)} />}
      <S.LeftPanel>
        <h2>캠페인 등록</h2>
        <S.StepIndicator>
          {steps.map((step) => (
            <S.StepItem key={step.id} $active={step.id === activeStep} completed={step.id < activeStep}>
              <S.StepCircle $active={step.id === activeStep} completed={step.id < activeStep}>
                {step.id < activeStep ? "✓" : step.id}
              </S.StepCircle>
              <S.StepLabel $active={step.id === activeStep}>{step.label}</S.StepLabel>
            </S.StepItem>
          ))}
        </S.StepIndicator>
      </S.LeftPanel>
      <S.RightPanel>
        <S.FormSection>
          <h3>홍보 유형 *</h3>
          <S.PromotionTypeGroup>
            <S.PromotionTypeBox
              selected={promotionType === "방문형"}
              onClick={() => set({ promotionType: "방문형" })}
            >
              <div>🏠</div>
              <h4>방문형</h4>
              <p>매장을 방문하고 체험 후 리뷰 작성</p>
            </S.PromotionTypeBox>
            <S.PromotionTypeBox
              selected={promotionType === "포장형"}
              onClick={() => set({ promotionType: "포장형" })}
            >
              <div>🛍️</div>
              <h4>포장형</h4>
              <p>방문 후 포장하여 리뷰 작성</p>
            </S.PromotionTypeBox>
            <S.PromotionTypeBox
              selected={promotionType === "배송형"}
              onClick={() => set({ promotionType: "배송형" })}
            >
              <div>📦</div>
              <h4>배송형</h4>
              <p>배송받은 제품 사용 후 리뷰 작성</p>
            </S.PromotionTypeBox>
            <S.PromotionTypeBox
              selected={promotionType === "구매형"}
              onClick={() => set({ promotionType: "구매형" })}
            >
              <div>🛒</div>
              <h4>구매형</h4>
              <p>제품 구매 후 리뷰, 구매평 리뷰 작성</p>
            </S.PromotionTypeBox>
          </S.PromotionTypeGroup>
        </S.FormSection>

        {(promotionType === "방문형" || promotionType === "포장형") && (
          <S.FormSection>
            <h3>주소 *</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Input placeholder="주소를 검색해주세요." value={address} disabled={true} />
              <S.SearchButton onClick={() => setIsAddressModalOpen(true)}>찾기</S.SearchButton>
            </div>
            <h3></h3>
            <Input placeholder="상세 주소를 입력해주세요." value={detail_address} onChange={(e) => set({ detail_address: e.target.value })} />
          </S.FormSection>
        )}

        {(promotionType === "배송형" || promotionType === "구매형") && (
          <S.FormSection>
            <h3>제품 URL *</h3>
            <Input placeholder="제공 내역 상세페이지와 일치하는 URL을 입력해주세요." value={product_url} onChange={(e) => set({ product_url: e.target.value })} />
          </S.FormSection>
        )}

        <S.FormSection>
          <h3>카테고리 *</h3>
          <S.Select value={category} onChange={(e) => set({ category: e.target.value }) }>
            <option value="">선택</option>
            <option value="생활">생활</option>
            <option value="서비스">서비스</option>
            <option value="유아">유아</option>
            <option value="식품">식품</option>
            <option value="디지털">디지털</option>
          </S.Select>
        </S.FormSection>

        {/* New DataType Select */}
        <S.FormSection>
          <h3>캠페인 분류 *</h3>
          <S.Select value={dataType || ""} onChange={(e) => set({ dataType: Number(e.target.value) as 1 | 2 | 3 | null }) }>
            <option value="">선택</option>
            {dataTypeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </S.Select>
        </S.FormSection>

        <S.FormSection>
          <h3>채널 (최대 2개 선택 가능) *</h3>
          <S.ChannelGroup>
            {channels.map((channel) => (
              <S.ChannelBox
                key={channel.id}
                onClick={() => handleChannelChange(channel.id)}
                selected={selectedChannels.includes(channel.id)}
              >
                <S.TitleRow>
                  <input
                    type="checkbox"
                    id={channel.id}
                    checked={selectedChannels.includes(channel.id)}
                  />
                  <label htmlFor={channel.id}>
                      <span>{channel.id}</span>
                      {channel.necessaryPoint && <S.Premium>P</S.Premium>}
                  </label>
                </S.TitleRow>
                <span>{channel.description}</span>
              </S.ChannelBox>
            ))}
          </S.ChannelGroup>
        </S.FormSection>

        <S.PremiumSection>
          <S.PremiumTitle>
            <S.Premium>P</S.Premium>
            <h3>프리미엄 체험단</h3>
          </S.PremiumTitle>
          <p>
            프리미엄 체험단은 더 많은 인플루언서에게 노출되어 캠페인 참여율을 높일 수 있습니다.
          </p>
          <p>
            블로그, 인스타그램 피드 외에 릴스, 쇼츠, 유튜브, 틱톡 등 다양한 채널을 활용하여
            캠페인을 홍보하고 싶은 경우에 선택해주세요.
          </p>
        </S.PremiumSection>

        <S.ButtonGroup>
          <S.PrevButton onClick={() => navigate("/campaign/creation/step1")}>← 이전</S.PrevButton>
          <S.SubmitButton onClick={handleNextStep}>다음 단계 →</S.SubmitButton>
        </S.ButtonGroup>
      </S.RightPanel>
    </S.Wrapper>
  );
};

export default CampaignCreationStep2Page;