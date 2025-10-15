import { loginApi } from "apis/login";
import Input from "components/Input/Input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "store/useUserStore";
import * as S from 'styles/login';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    pw: '',
    autoLogin: false,
  });
  const [isFull, setIsFull] = useState(false);
  const navigate = useNavigate();
  const { login } = useUserStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    if (isFull) {
      const { data } = await loginApi({email: form.email, password: form.pw});
      login(data.user.userType, data.access_token);
      navigate('/');
    }
  }

  useEffect(() => {
    (form.email && form.pw) ? setIsFull(true) : setIsFull(false);
  }, [form])

  return (
    <>
      <S.LoginForm>
        <h2>서비스 로그인</h2>
        <S.FieldContainer>
          <Input
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요."
            value={form.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="pw"
            placeholder="비밀번호를 입력해주세요."
            value={form.pw}
            onChange={handleChange}
          />
        </S.FieldContainer>
        <S.Detail>
          <S.AutoLogin>
            <input
              type="checkbox"
              name="autoLogin"
              checked={form.autoLogin}
              onChange={() => setForm((prev) => ({
                ...prev,
                autoLogin: !form.autoLogin
              }))}
            />
            <span>자동 로그인</span>
          </S.AutoLogin>
          <S.Pw>비밀번호 찾기</S.Pw>
        </S.Detail>
        <S.LoginButton isFull={isFull} onClick={handleSubmit}>
          로그인
        </S.LoginButton>
      </S.LoginForm>
      <S.Signup>
        <S.Description>
          <h3>저희 서비스를 체험해보세요!</h3>
          <p>다양한 체험단 모집 공고가 있습니다!</p>
        </S.Description>
        <S.SignupButton to="/signup">
          회원가입
        </S.SignupButton>
      </S.Signup>
    </>
  )
};