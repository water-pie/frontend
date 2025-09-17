import * as S from "styles/campaign/creation";
import { Input } from "components/Input/Input";
import { useNavigate } from "react-router-dom";

const CampaignCreationStep1Page = () => {
  const steps = [
    { id: 1, label: "기본 정보" },
    { id: 2, label: "홍보 유형 및 카테고리와 채널" },
    { id: 3, label: "체험 가능 요일 및 시간" },
    { id: 4, label: "키워드 및 설명" },
    { id: 5, label: "제공 내역 및 포인트 결제" },
  ];
  const activeStep = 1;
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
          <h3>대표 사진 등록</h3>
          <p>해당 체험단에 맞는 대표 사진을 업로드 해주세요.</p>
          <p>사이즈 : 300 X 400 이상 / 파일 형식 : PNG, JPG</p>
          <S.ImageUploadArea>
            <span>사진 등록</span>
          </S.ImageUploadArea>
          <S.ImageUploadButton>사진 등록</S.ImageUploadButton>
        </S.FormSection>

        <S.FormSection>
          <h3>상호명</h3>
          <Input placeholder="매장의 경우 네이버 플레이스 등록 기준으로 입력해주세요." />
        </S.FormSection>

        <S.FormSection>
          <h3>담당자 연락처</h3>
          <Input placeholder="예) 010-1234-5678" />
        </S.FormSection>

        <S.ButtonGroup>
          <S.SubmitButton onClick={() => navigate("/campaign/creation/step2")}>다음 단계 →</S.SubmitButton>
        </S.ButtonGroup>
      </S.RightPanel>
    </S.Wrapper>
  );
};

export default CampaignCreationStep1Page;