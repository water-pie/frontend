import * as S from "styles/Signup/signup";
import { useParams } from "react-router-dom";
import { Influence, Brand, Marketing } from "./Type";

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
      <S.SignupTextBox>
        <h2>서비스 회원가입</h2>
        <p>{message[0]}</p>
        <span>{message[1]}</span>
      </S.SignupTextBox>

      {type === "influence" && (
        <Influence type={type} />
      )}
      {type === "brand" && (
        <Brand type={type} />
      )}
      {type === "marketing" && (
        <Marketing type={type} />
      )}
    </>
  )
};