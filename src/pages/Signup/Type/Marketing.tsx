import * as S from "styles/Signup";
import { Business, PersonalInfo } from "components/SignupField";
import { useState } from "react";
import type { FormState } from "types/input";

interface Props {
  type: string,
}

export default function Marketing({ type }: Props) {
  const [step, setStep] = useState(1);
  const [personalInfoForm, setPersonalInfoForm] = useState<FormState>({
    email: '',
    code: '',
    pw: '',
    checkPw: '',
    name: '',
    phone: '',
    subPhone: '',
  });
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [businessInfoForm, setBusinessInfoForm] = useState({
    registrationNumber: "",
    address: "",
    detailedAddress: "",
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPersonalInfoForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBusinessInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessInfoForm({
      ...businessInfoForm,
      [name]: value,
    });
  };

  const handlePrevStep = () => {
    setStep(step-1);
  }

  const handleNextStep = () => {
    if (step === 1 && !isEmailVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }
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
              form={personalInfoForm}
              handleChange={handlePersonalInfoChange}
              isCodeSent={isCodeSent}
              setIsCodeSent={setIsCodeSent}
              isEmailVerified={isEmailVerified}
              setIsEmailVerified={setIsEmailVerified}
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
            <Business
              form={businessInfoForm}
              handleChange={handleBusinessInfoChange}
              setForm={setBusinessInfoForm}
            />
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