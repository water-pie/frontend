import * as S from "styles/campaign/creation";
import { Input } from "components/Input/Input";
import { useNavigate } from "react-router-dom";
import { useCampaignCreationStore } from "store/useCampaignCreationStore";

const CampaignCreationStep4Page = () => {
  const steps = [
    { id: 1, label: "기본 정보" },
    { id: 2, label: "홍보 유형 및 카테고리와 채널" },
    { id: 3, label: "체험 가능 요일 및 시간" },
    { id: 4, label: "키워드 및 설명" },
    { id: 5, label: "제공 내역 및 포인트 결제" },
  ];
  const activeStep = 4;
  const navigate = useNavigate();
  const mission = useCampaignCreationStore(state => state.mission);
  const keywords = useCampaignCreationStore(state => state.keywords);
  const set = useCampaignCreationStore(state => state.set);

  const handleKeywordChange = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    set({ keywords: newKeywords });
  };

  const canProceed = (
    mission.trim() !== '' &&
    keywords.some(keyword => keyword.trim() !== '')
  );

  const handleNextStep = () => {
    if (canProceed) {
      navigate("/campaign/creation/step5");
    } else {
      alert("필수 정보를 모두 입력해주세요.");
    }
  };

  return (
    <S.Wrapper>
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
          <h3>체험단 미션 *</h3>
          <p>홍보하고 싶은 키워드 위주로 명확하게 작성해 주세요!</p>
          <S.FullWidthTextarea
            placeholder="예시) 1. 30초 이상의 영상 2. 20년 맛집 키워드 5번 포함"
            value={mission}
            onChange={(e) => set({ mission: e.target.value })}
          />
          <S.Warning>영수증 리뷰/네이버 예약 불가 가이드는 리뷰헬퍼 가이드로 진행</S.Warning>
        </S.FormSection>

        <S.FormSection>
          <h3>홍보할 검색 키워드</h3>
          <p>키워드 5가지를 선택해서 작성해 주세요.</p>
          {keywords.map((keyword, index) => (
            <S.InputGroup key={index}>
              <span>키워드 {index + 1}</span>
              <Input placeholder={index === 0 ? "예시) 20년 카페" : ""} value={keyword} onChange={(e) => handleKeywordChange(index, e.target.value)} />
            </S.InputGroup>
          ))}
        </S.FormSection>

        <S.ButtonGroup>
          <S.PrevButton onClick={() => navigate("/campaign/creation/step3")}>← 이전</S.PrevButton>
          <S.SubmitButton onClick={handleNextStep}>다음 단계 →</S.SubmitButton>
        </S.ButtonGroup>
      </S.RightPanel>
    </S.Wrapper>
  );
};

export default CampaignCreationStep4Page;