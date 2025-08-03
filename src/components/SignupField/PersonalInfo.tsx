import styled from "@emotion/styled";
import Input, { SendInput } from "components/Input/Input";
import { useState } from "react";
import type { FormState } from "types/input";

interface Props {
  extra?: boolean;
}

const otherInputFields = [
  { name: 'pw', type: 'password', placeholder: '비밀번호를 입력해주세요.' },
  { name: 'checkPw', type: 'password', placeholder: '비밀번호를 재입력해주세요.' },
  { name: 'name', type: 'text', placeholder: '성명을 입력해주세요.' },
  { name: 'phone', type: 'tel', placeholder: '연락처를 입력해주세요.' },
];

export const PersonalInfo = ({ extra }: Props) => {
  const [form, setForm] = useState<FormState>({
    email: '',
    code: '',
    pw: '',
    checkPw: '',
    name: '',
    phone: '',
    subPhone: '',
  });
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendCode = () => {
    // NOTE: In a real application, you would make an API call here.
    setEmailSent(true);
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
        />
        <SendCodeButton onClick={handleSendCode}>인증</SendCodeButton>
      </InputContainer>

      {emailSent && (
        <InputContainer>
          <SendInput
            type="text"
            name="code"
            placeholder="인증코드를 입력해주세요."
            value={form.code}
            onChange={handleChange}
          />
          <SendCodeButton>확인</SendCodeButton>
        </InputContainer>
      )}

      {otherInputFields.map((field) => (
        <Input
          key={field.name}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          value={form[field.name]}
          onChange={handleChange}
        />
      ))}
      {extra && (
        <Input
          type="tel"
          name="subPhone"
          placeholder="연락처(부)를 입력해주세요."
          value={form.subPhone}
          onChange={handleChange}
        />
      )}
    </>
  );
};

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`

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
`