import * as S from 'styles/signup';

export default function SelectSignup() {
  return (
    <>
      <S.Textarea>
        <h2>서비스 회원가입</h2>
        <span>서비스에 가입하실 회원 유형을 선택해주세요!</span>
      </S.Textarea>
      <S.SignupBox>
        <S.SignupTypeBox to="/signup/influence">
          <S.ImgBox color="#FF7F00">
            <img src="/influence.png" alt="인플루언서" />
          </S.ImgBox>
          <span>인플루언서</span>
        </S.SignupTypeBox>
        <S.SignupTypeBox to="/signup/brand">
          <S.ImgBox color="#00932F">
            <img src="/brand.png" alt="브랜드 담당자" />
          </S.ImgBox>
          <span>브랜드 담당자</span>
        </S.SignupTypeBox>
        <S.SignupTypeBox to="/signup/marketing">
          <S.ImgBox color="#0077FF">
            <img src="/marketing.png" alt="마케팅 대행사" />
          </S.ImgBox>
          <span>마케팅 대행사</span>
        </S.SignupTypeBox>
      </S.SignupBox>
    </>
  )
};