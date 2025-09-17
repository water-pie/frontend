import { useNavigate } from "react-router-dom";
import * as S from "styles/campaign/creation";

const CampaignCreationStep3Page = () => {
  const steps = [
    { id: 1, label: "기본 정보" },
    { id: 2, label: "홍보 유형 및 카테고리와 채널" },
    { id: 3, label: "체험 가능 요일 및 시간" },
    { id: 4, label: "키워드 및 설명" },
    { id: 5, label: "제공 내역 및 포인트 결제" },
  ];
  const activeStep = 3;
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
          <h3>체험 가능 요일</h3>
          <S.CheckboxGroup>
            <S.Checkbox>
              <input type="checkbox" />
              <span>월</span>
            </S.Checkbox>
            <S.Checkbox>
              <input type="checkbox" />
              <span>화</span>
            </S.Checkbox>
            <S.Checkbox>
              <input type="checkbox" />
              <span>수</span>
            </S.Checkbox>
            <S.Checkbox>
              <input type="checkbox" />
              <span>목</span>
            </S.Checkbox>
            <S.Checkbox>
              <input type="checkbox" />
              <span>금</span>
            </S.Checkbox>
            <S.Checkbox>
              <input type="checkbox" />
              <span>토</span>
            </S.Checkbox>
            <S.Checkbox>
              <input type="checkbox" />
              <span>일</span>
            </S.Checkbox>
          </S.CheckboxGroup>
        </S.FormSection>

        <S.FormSection>
          <h3>체험 가능 시간</h3>
          <S.TimeInputGroup>
            <input type="time" />
            <span>~</span>
            <input type="time" />
          </S.TimeInputGroup>
        </S.FormSection>

        <S.FormSection>
          <h3>캠페인 등록 마감일</h3>
          <S.DateInput type="date" />
        </S.FormSection>

        <S.ButtonGroup>
          <S.PrevButton onClick={() => navigate("/campaign/creation/step2")}>← 이전</S.PrevButton>
          <S.SubmitButton onClick={() => navigate("/campaign/creation/step4")}>다음</S.SubmitButton>
        </S.ButtonGroup>
      </S.RightPanel>
    </S.Wrapper>
  );
};

export default CampaignCreationStep3Page;
