import * as S from "styles/campaign/creation";
import { Input } from "components/Input/Input";
import { useNavigate } from "react-router-dom";
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
          <h3>제공 내역</h3>
          <p>키워드를 명확하게 5가지를 선택해서 작성해 주세요.</p>
          <S.FullWidthTextarea placeholder="예) 5만원 식사권, 4만원 식사권(신메뉴 1개 필수)" />
          <S.Warning>가격과 품목을 명확히 표기하지 않으면 반려되니 주의하세요.</S.Warning>
        </S.FormSection>

        <S.FormSection>
          <h3>체험단 모집 인원</h3>
          <S.InputGroup>
            <Input placeholder="" type="number" />
            <span>명</span>
          </S.InputGroup>
        </S.FormSection>

        <S.FormSection>
          <h3>1인당 지급할 포인트</h3>
          <S.InputGroup>
            <Input placeholder="0" type="number" />
            <span>포인트</span>
          </S.InputGroup>
          <S.PurchaseWarning>구매평리뷰는 구매 단가 이상으로 포인트를 지급해주셔야합니다.</S.PurchaseWarning>
        </S.FormSection>

        <S.SummaryBox>
          <S.SummaryRow>
            <span>홍보 유형</span>
            <span>방문형</span>
          </S.SummaryRow>
          <S.SummaryRow>
            <span>모집 채널</span>
            <span>인스타그램 - 피드</span>
          </S.SummaryRow>
          <S.SummaryRow>
            <span>모집 인원</span>
            <span>0 명</span>
          </S.SummaryRow>
          <S.SummaryRow>
            <span>체험단 비용</span>
            <span>0 P</span>
          </S.SummaryRow>
          <S.SummaryRow>
            <span>수수료 (20%)</span>
            <span>0 P</span>
          </S.SummaryRow>
          <S.SummaryRow className="total">
            <span>필요 포인트</span>
            <span>0 P</span>
          </S.SummaryRow>
        </S.SummaryBox>

        <S.PointInfo>
          <div>
            <p>보유 포인트: 0 P</p>
            <p>부족한 포인트: 0 P</p>
          </div>
          <button>충전하기</button>
        </S.PointInfo>

        <S.ButtonGroup>
          <S.PrevButton onClick={() => navigate("/campaign/creation/step4")}>← 이전</S.PrevButton>
          <S.SubmitButton onClick={() => navigate("/business")}>체험단 등록</S.SubmitButton>
        </S.ButtonGroup>
      </S.RightPanel>
    </S.Wrapper>
  );
};

export default CampaignCreationPage;