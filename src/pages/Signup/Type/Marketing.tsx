import * as S from "styles/Signup";
import { Business, PersonalInfo } from "components/SignupField";
import { useState } from "react";

interface Props {
  type: string,
}

export default function Marketing({ type }: Props) {
  const [step, setStep] = useState(1);

  const handlePrevStep = () => {
    setStep(step-1);
  }

  const handleNextStep = () => {
    setStep(step+1);
  }

  return (
    <>
      <S.StepIndicator>
        <S.StepItem active={step === 1} completed={step > 1}>
          <S.StepCircle active={step === 1} completed={step > 1}/>
          <S.StepLabel active={step === 1}>사용자 정보</S.StepLabel>
        </S.StepItem>

        <S.StepItem active={step === 2}>
          <S.StepCircle active={step === 2}/>
          <S.StepLabel active={step === 2}>사업자 등록</S.StepLabel>
        </S.StepItem>
      </S.StepIndicator>

      {step === 1 && (
        <>
          <S.SignupField>
            <PersonalInfo
              extra={type !== "influence"}
            />
          </S.SignupField>
          <S.SignupTerms>
            <S.TermsBox>
              <input type="checkbox" />
              <span>약관에 동의합니다. (필수)</span>
            </S.TermsBox>
            <S.ButtonBox>
              <S.SignupButton onClick={handleNextStep}>다음 단계 &rarr;</S.SignupButton>
            </S.ButtonBox>
          </S.SignupTerms>
        </>
      )}
      {step === 2 && (
        <>
          <S.SignupField>
            <Business />
          </S.SignupField>
          <S.SignupTerms>
            <S.ButtonBox>
              <S.SignupButton onClick={handlePrevStep}>&larr; 이전</S.SignupButton>
              <S.SignupButton>회원가입</S.SignupButton>
            </S.ButtonBox>
          </S.SignupTerms>
        </>
      )}
    </>
  )
};