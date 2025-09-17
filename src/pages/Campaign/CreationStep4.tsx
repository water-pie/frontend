import * as S from "styles/campaign/creation";
import { Input } from "components/Input/Input";
import { useNavigate } from "react-router-dom";

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
          <h3>체험단 미션</h3>
          <p>홍보하고 싶은 키워드 위주로 명확하게 작성해 주세요!</p>
          <S.FullWidthTextarea placeholder="예시)\n1. 20년 운영한 카페\n2. 어디에서 맛볼 수 없는 컵빙수\n3. 감성적인 인테리어" />
          <S.Warning>영수증 리뷰/네이버 예약 불가 가이드는 워터파이 가이드로 진행</S.Warning>
        </S.FormSection>

        <S.FormSection>
          <h3>홍보할 검색 키워드</h3>
          <p>키워드를 명확하게 5가지를 선택해서 작성해 주세요.
해당 키워드는 추천 키워드 시스템에 반영됩니다.</p>
          <S.InputGroup>
            <span>키워드 1</span>
            <Input placeholder="예시) 20년 카페" />
          </S.InputGroup>
          <S.InputGroup>
            <span>키워드 2</span>
            <Input placeholder="" />
          </S.InputGroup>
          <S.InputGroup>
            <span>키워드 3</span>
            <Input placeholder="" />
          </S.InputGroup>
          <S.InputGroup>
            <span>키워드 4</span>
            <Input placeholder="" />
          </S.InputGroup>
          <S.InputGroup>
            <span>키워드 5</span>
            <Input placeholder="" />
          </S.InputGroup>
        </S.FormSection>

        <S.ButtonGroup>
          <S.PrevButton onClick={() => navigate("/campaign/creation/step3")}>← 이전</S.PrevButton>
          <S.SubmitButton onClick={() => navigate("/campaign/creation/step5")}>다음 단계 →</S.SubmitButton>
        </S.ButtonGroup>
      </S.RightPanel>
    </S.Wrapper>
  );
};

export default CampaignCreationStep4Page;
