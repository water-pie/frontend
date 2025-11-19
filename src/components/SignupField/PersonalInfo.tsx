import styled from "@emotion/styled";
import Input, { SendInput } from "components/Input/Input";
import { generateLicenseCodeApi, verifyLicenseCodeApi } from "apis/license";
import type { FormState } from "types/input";
import { useEffect, useState } from "react";

interface Props {
  extra?: boolean;
  form: FormState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isCodeSent: boolean;
  setIsCodeSent: React.Dispatch<React.SetStateAction<boolean>>;
  isEmailVerified: boolean;
  setIsEmailVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

const otherInputFields = [
  { name: 'pw', type: 'password', placeholder: '비밀번호를 입력해주세요.' },
  { name: 'checkPw', type: 'password', placeholder: '비밀번호를 재입력해주세요.' },
  { name: 'name', type: 'text', placeholder: '성명을 입력해주세요.' },
  { name: 'phone', type: 'text', placeholder: '연락처를 입력해주세요.' },
];

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin: 4px 0 0 4px;
  width: 100%;
  text-align: left;
`;

export const PersonalInfo = ({
  extra,
  form,
  handleChange,
  isCodeSent,
  setIsCodeSent,
  isEmailVerified,
  setIsEmailVerified,
}: Props) => {
  const [sendLoading, setSendLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [errors, setErrors] = useState({ phone: '', subPhone: '', pw: '' });
  
  useEffect(() => {
    const phoneRegex = /^010-?\d{4}-?\d{4}$/;
    if (form.phone && !phoneRegex.test(form.phone)) {
      setErrors(prev => ({ ...prev, phone: '올바른 전화번호 형식이 아닙니다.' }));
    } else {
      setErrors(prev => ({ ...prev, phone: '' }));
    }

    if (form.subPhone && !phoneRegex.test(form.subPhone)) {
      setErrors(prev => ({ ...prev, subPhone: '올바른 전화번호 형식이 아닙니다.' }));
    } else {
      setErrors(prev => ({ ...prev, subPhone: '' }));
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/;
    if (form.pw && !passwordRegex.test(form.pw)) {
      setErrors(prev => ({ ...prev, pw: '비밀번호는 8~20자 영문, 숫자를 포함해야 합니다.'}));
    } else {
      setErrors(prev => ({ ...prev, pw: '' }));
    }
  }, [form.phone, form.subPhone, form.pw]);

  const handleSendCode = async () => {
    setSendLoading(true);
    try {
      const response = await generateLicenseCodeApi(form.email);
      console.log('API Response Data:', response.data);
      if (response.data.sent) {
        setIsCodeSent(true);
        alert("인증 코드가 이메일로 전송되었습니다.");
      } else {
        alert("인증 코드 전송에 실패했습니다.");
      }
    } catch (error) {
      alert("인증 코드 전송 중 오류가 발생했습니다.");
      console.error("Error sending verification code:", error);
    } finally {
      setSendLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setVerifyLoading(true);
    try {
      const response = await verifyLicenseCodeApi(form.email, form.code);
      if (response.data.valid) {
        setIsEmailVerified(true);
        alert("이메일이 성공적으로 인증되었습니다.");
      } else {
        alert("인증 코드 확인에 실패했습니다.");
      }
    } catch (error) {
      alert("인증 코드 확인 중 오류가 발생했습니다.");
      console.error("Error verifying code:", error);
    } finally {
      setVerifyLoading(false);
    }
  };

  return (
    <>
      <InputContainer>
        <SendInput
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요."
          value={form.email}
          onChange={handleChange}
          disabled={isCodeSent}
        />
        <SendCodeButton onClick={handleSendCode} disabled={isCodeSent || sendLoading}>
          {sendLoading ? '전송중' : '인증'}
        </SendCodeButton>
      </InputContainer>

      {isCodeSent && (
        <InputContainer>
          <SendInput
            type="text"
            name="code"
            placeholder="인증코드를 입력해주세요."
            value={form.code}
            onChange={handleChange}
            disabled={isEmailVerified}
          />
          <SendCodeButton onClick={handleVerifyCode} disabled={isEmailVerified || verifyLoading}>
            {verifyLoading ? '확인중' : '확인'}
          </SendCodeButton>
        </InputContainer>
      )}

      {otherInputFields.map((field) => (
        <div key={field.name} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Input
            type={field.type}
            name={field.name}
            maxLength={13}
            placeholder={field.placeholder}
            value={form[field.name]}
            onChange={handleChange}
          />
          {field.name === 'phone' && errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
          {field.name === 'pw' && errors.pw && <ErrorMessage>{errors.pw}</ErrorMessage>}
        </div>
      ))}
      {extra && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Input
            type="text"
            name="subPhone"
            maxLength={13}
            placeholder="연락처(부)를 입력해주세요."
            value={form.subPhone}
            onChange={handleChange}
          />
          {errors.subPhone && <ErrorMessage>{errors.subPhone}</ErrorMessage>}
        </div>
      )}
    </>
  );
};

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;

export const SendCodeButton = styled.button`
  word-break: keep-all;
  font-size: 18px;
  font-weight: 600;
  background-color: #96d3ff;
  color: white;
  border-radius: 10px;
  border: none;
  padding: 0px 20px;
  cursor: pointer;

  :hover {
    background-color: #68C0FF;
  }

  :disabled {
    background-color: #c0c0c0;
    cursor: not-allowed;
  }
`;