import styled from "@emotion/styled";
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
          <h2>플랫폼 등록</h2>
          <Platform />
        </SignupField>
      )}
    </>
  )
};

export const SignupTextBox = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  border-bottom: 2px solid gray;

  h2, p {
    margin-bottom: 0;
  }
`

export const SignupField = styled.div`
  margin-top: 50px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`