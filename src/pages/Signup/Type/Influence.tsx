import * as S from "styles/Signup";
import { PersonalInfo, Platform } from "components/SignupField";
import { useState } from "react";
import type { FormState } from "types/input";
import { signupAsInfluencer } from "apis/signup";
import { useNavigate } from "react-router-dom";
import { formatPhoneNumber } from "utils/formatters";

interface Props {
  type: string,
}

export default function Influence({ type }: Props) {
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
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false);
  const [platformForm, setPlatformForm] = useState({
    youtube: "",
    blog: "",
    insta: "",
    tiktok: "",
  });
  const navigate = useNavigate();

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'phone') {
      formattedValue = formatPhoneNumber(value);
    }

    setPersonalInfoForm((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handlePlatformChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPlatformForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePrevStep = () => {
    setStep(step-1);
  }

  const handleNextStep = () => {
    if (step === 1) {
      if (!isEmailVerified) {
        alert("이메일 인증을 완료해주세요.");
        return;
      }
      if (personalInfoForm.pw.length < 8) {
        alert("비밀번호는 8자 이상이어야 합니다.");
        return;
      }
      if (personalInfoForm.pw !== personalInfoForm.checkPw) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      if (!termsAgreed) {
        alert("약관에 동의해주세요. (필수)");
        return;
      }
    }
    setStep(step+1);
  }

  const handleSignup = async () => {
    const hasPlatformUrl = Object.values(platformForm).some(url => url.trim() !== '');
    if (!hasPlatformUrl) {
      alert("하나 이상의 플랫폼 URL을 입력해주세요.");
      return;
    }

    try {
      await signupAsInfluencer({
        email: personalInfoForm.email,
        password: personalInfoForm.pw,
        name: personalInfoForm.name,
        phoneNumber: personalInfoForm.phone,
        youtubeUrl: platformForm.youtube || undefined,
        blogUrl: platformForm.blog || undefined,
        instagramUrl: platformForm.insta || undefined,
        tiktokUrl: platformForm.tiktok || undefined,
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

        <S.StepItem active={step === 2}>
          <S.StepCircle active={step === 2}/>
          <S.StepLabel active={step === 2}>플랫폼 등록</S.StepLabel>
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
              <input type="checkbox" checked={termsAgreed} onChange={(e) => setTermsAgreed(e.target.checked)} />
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
              <S.SignupButton onClick={handleSignup}>회원가입</S.SignupButton>
            </S.ButtonBox>
          </S.SignupTerms>
        </>
      )}
    </>
  )
};