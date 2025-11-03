import * as S from "styles/Signup";
import { Business, PersonalInfo, Platform } from "components/SignupField";
import { useState } from "react";
import type { FormState } from "types/input";
import { signupAsBrandManager } from "apis/signup";
import { useNavigate } from "react-router-dom";

interface Props {
  type: string,
}

export default function Brand({ type }: Props) {
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
  const [platformForm, setPlatformForm] = useState({
    youtube: "",
    blog: "",
    insta: "",
    tiktok: "",
  });
  const [businessInfoForm, setBusinessInfoForm] = useState({
    registrationNumber: "",
    address: "",
    detailedAddress: "",
  });
  const navigate = useNavigate();

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPersonalInfoForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlatformChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPlatformForm((prev) => ({
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
    if (step === 1 && (personalInfoForm.pw !== personalInfoForm.checkPw)) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (step === 2) {
      const hasPlatformUrl = Object.values(platformForm).some(url => url.trim() !== '');
      if (!hasPlatformUrl) {
        alert("하나 이상의 플랫폼 URL을 입력해주세요.");
        return;
      }
    }
    setStep(step+1);
  }

  const handleSignup = async () => {
    if (!businessInfoForm.registrationNumber || !businessInfoForm.address || !businessInfoForm.detailedAddress) {
        alert("사업자 정보를 모두 입력해주세요.");
        return;
    }

    try {
        await signupAsBrandManager({
            email: personalInfoForm.email,
            password: personalInfoForm.pw,
            name: personalInfoForm.name,
            phoneNumber: personalInfoForm.phone,
            youtubeUrl: platformForm.youtube || undefined,
            blogUrl: platformForm.blog || undefined,
            instagramUrl: platformForm.insta || undefined,
            tiktokUrl: platformForm.tiktok || undefined,
            businessRegistrationNumber: businessInfoForm.registrationNumber,
            address: businessInfoForm.address,
            detailedAddress: businessInfoForm.detailedAddress,
        });
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
    } catch (e) {
        alert(`회원가입 중 오류가 발생했습니다: ${e}`);
    }
  };

  return (
    <>
      <S.StepIndicator>
        <S.StepItem active={step === 1} completed={step > 1}>
          <S.StepCircle active={step === 1} completed={step > 1}/>
          <S.StepLabel active={step === 1}>사용자 정보</S.StepLabel>
        </S.StepItem>

        <S.StepItem active={step === 2} completed={step > 2}>
          <S.StepCircle active={step === 2} completed={step > 2}/>
          <S.StepLabel active={step === 2}>플랫폼 등록</S.StepLabel>
        </S.StepItem>

         <S.StepItem active={step === 3}>
          <S.StepCircle active={step === 3}/>
          <S.StepLabel active={step === 3}>사업자 등록</S.StepLabel>
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
            <Platform form={platformForm} handleChange={handlePlatformChange} />
          </S.SignupField>
          <S.SignupTerms>
            <S.ButtonBox>
              <S.SignupButton onClick={handlePrevStep}>&larr; 이전</S.SignupButton>
              <S.SignupButton onClick={handleNextStep}>다음 단계 &rarr;</S.SignupButton>
            </S.ButtonBox>
          </S.SignupTerms>
        </>
      )}
      {step === 3 && (
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
              <S.SignupButton onClick={handleSignup}>회원가입</S.SignupButton>
            </S.ButtonBox>
          </S.SignupTerms>
        </>
      )}
    </>
  )
};
