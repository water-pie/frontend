import styled from "@emotion/styled";
import Business from "components/SignupField/Business";
import { PersonalInfo } from "components/SignupField/PersonalInfo";
import { Platform } from "components/SignupField/Platform";
import { useParams } from "react-router-dom";

const typeMessage = {
  "influence": ["인플루언서 회원가입을 진행한 후", "다양한 제휴업체를 경험해보세요!"],
  "brand": ["브랜드 담당자 회원가입을 진행한 후", "다양한 인플루언서들을 만나보세요!"],
  "marketing": ["마케팅 대행사 회원가입을 진행한 후", "다양한 인플루언서들을 만나보세요!"],
};

export default function Signup() {
  const { type } = useParams();
  const message = typeMessage[type as keyof typeof typeMessage] ?? "";

  return (
    <>
      <SignupTextBox>
        <h2>서비스 회원가입</h2>
        <p>{message[0]}</p>
        <span>{message[1]}</span>
      </SignupTextBox>
      <SignupField>
        <PersonalInfo
          extra={type !== "influence"}
        />
      </SignupField>
      {type !== "marketing" && (
        <SignupField>
          <h3>플랫폼 등록</h3>
          <Platform />
        </SignupField>
      )}
      {type !== "influence" && (
        <SignupField>
          <h3>사업자 등록증</h3>
          <Business />
        </SignupField>
      )}
      <SignupTerms>
        <TermsBox>
          <input type="checkbox" />
          <p>약관에 동의합니다. (필수)</p>
        </TermsBox>
        <SignupButton >회원가입</SignupButton>
      </SignupTerms>
    </>
  )
};

export const SignupTerms = styled.div`
  margin-top: 20px;
  padding: 20px 0px;
  border-top: 2px solid gray;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`

export const TermsBox = styled.div`
  display: flex;
  gap: 8px;
`

export const SignupTextBox = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  border-bottom: 2px solid gray;

  h2, p {
    margin-bottom: 0;
  }
`;

export const SignupField = styled.div`
  margin-top: 50px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  h3 {
    margin-bottom: 0;
  }
`;

export const SignupButton = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50px;
  align-items: center;
  background-color: #96d3ff;
  font-size: 20px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;

  :hover {
    background-color: #68C0FF;
  }
`