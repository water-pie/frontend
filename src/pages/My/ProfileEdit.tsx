import { useState } from 'react';
import * as S from 'styles/my/profileEdit';
import { Input } from 'components/Input/Input';

const ProfileEdit = () => {
  const [nickname, setNickname] = useState('Username');
  const [email, setEmail] = useState('waterpie1234@gmail.com');
  const [contact, setContact] = useState('010-1234-5678');
  const [password, setPassword] = useState('********');
  const [showPassword, setShowPassword] = useState(false);

  const handleEdit = () => {
    alert('프로필이 수정되었습니다.');
  };

  return (
    <S.ProfileEditContainer>
      <S.Title>프로필 수정</S.Title>
      <S.FormSection>
        <S.FormGroup>
          <S.Label>닉네임</S.Label>
          <Input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </S.FormGroup>
        <S.FormGroup>
          <S.Label>이메일</S.Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disable={true} // Email usually not editable
          />
        </S.FormGroup>
        <S.FormGroup>
          <S.Label>연락처</S.Label>
          <Input
            type="tel"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </S.FormGroup>
        <S.FormGroup>
          <S.Label>비밀번호</S.Label>
          <S.PasswordInputWrapper>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <S.PasswordToggleButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? '👁️' : '🙈'}
            </S.PasswordToggleButton>
          </S.PasswordInputWrapper>
        </S.FormGroup>
      </S.FormSection>
      <S.SubmitButton onClick={handleEdit}>수정</S.SubmitButton>
    </S.ProfileEditContainer>
  );
};

export default ProfileEdit;