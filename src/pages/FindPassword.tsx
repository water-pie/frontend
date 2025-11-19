import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from 'styles/findPassword';
import Input, { SendInput } from 'components/Input/Input';
import { resetPassword } from 'apis/user';
import { generateLicenseCodeApi } from 'apis/license';

export default function FindPassword() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [pw, setPw] = useState('');
  const [checkPw, setCheckPw] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const navigate = useNavigate();

  const handleSendCode = async () => {
    if (!email.includes('@')) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    try {
      const response = await generateLicenseCodeApi(email);
      if (response.data.sent) {
        setIsCodeSent(true);
        alert("인증 코드가 이메일로 전송되었습니다.");
      } else {
        alert("인증 코드 전송에 실패했습니다.");
      }
    } catch (error) {
      alert('인증 코드 발송에 실패했습니다.');
      console.error(error);
    }
  };

  const handleResetPassword = async () => {
    if (pw.length < 8) {
      alert('비밀번호는 8자 이상이어야 합니다.');
      return;
    }
    if (pw !== checkPw) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      await resetPassword({ email, newPassword: pw, code: code });
      alert('비밀번호가 성공적으로 변경되었습니다.');
      navigate('/login');
    } catch (error) {
      alert('비밀번호 변경에 실패했습니다.');
      console.error(error);
    }
  };

  return (
    <>
      <S.SignupTextBox>
        <h2>비밀번호 찾기</h2>
        <p>가입 시 사용한 이메일을 통해 비밀번호를 재설정할 수 있습니다.</p>
      </S.SignupTextBox>

      <S.FormContainer>
        <S.InputGap>
          <S.AuthInputRow>
            <SendInput
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isCodeSent}
            />
            <S.AuthButton onClick={handleSendCode} disabled={isCodeSent || !email}>
              {isCodeSent ? '재전송' : '인증요청'}
            </S.AuthButton>
          </S.AuthInputRow>
          {isCodeSent && (
            <SendInput
              type="text"
              name="code"
              placeholder="인증코드를 입력해주세요."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          )}
          <S.PasswordInputContainer>
            <SendInput
              type="password"
              name="pw"
              placeholder="새 비밀번호 (8자 이상)"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </S.PasswordInputContainer>
          <S.PasswordInputContainer>
            <Input
              type="password"
              name="checkPw"
              placeholder="새 비밀번호 확인"
              value={checkPw}
              onChange={(e) => setCheckPw(e.target.value)}
            />
          </S.PasswordInputContainer>
        </S.InputGap>
        <S.ButtonBox>
          <S.ChangeButton isFull={pw.length >= 8 && pw === checkPw} onClick={handleResetPassword}>
            비밀번호 변경
          </S.ChangeButton>
        </S.ButtonBox>
      </S.FormContainer>
    </>
  );
}
