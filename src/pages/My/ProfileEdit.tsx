import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from 'styles/my/profileEdit';
import { Input } from 'components/Input/Input';
import showPasswordIcon from 'assets/images/show.png';
import hidePasswordIcon from 'assets/images/hide.png';
import { updateUserInfoApi, changePasswordApi, getUserInfoApi } from 'apis/user';
import useUserStore from 'store/useUserStore';
import { type UpdateUserInfoPayload, type ChangePasswordPayload } from 'types/apis/user';
import { formatPhoneNumber } from 'utils/formatters';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  const token = userInfo?.token;

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isEditingPassword = newPassword && confirmNewPassword;

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (token) {
        try {
          const response = await getUserInfoApi(token);
          setNickname(response.data.name);
          setEmail(response.data.email);
          setContact(response.data.phoneNumber);
        } catch (error) {
          console.error("Failed to fetch user info:", error);
          alert("사용자 정보를 불러오는데 실패했습니다.");
        }
      }
    };
    fetchUserInfo();
  }, [token]);

  const handleEdit = async () => {
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      const userInfoPayload: UpdateUserInfoPayload = {
        name: nickname,
        email: email,
        phoneNumber: contact,
      };
      await updateUserInfoApi(userInfoPayload, token);

      if (isEditingPassword) {
        if (newPassword !== confirmNewPassword) {
          alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
          return;
        }
        if (!currentPassword || !newPassword) {
          alert("현재 비밀번호와 새 비밀번호를 모두 입력해주세요.");
          return;
        }

        const passwordPayload: ChangePasswordPayload = {
          currentPassword: currentPassword,
          newPassword: newPassword,
        };
        await changePasswordApi(passwordPayload, token);
      }

      alert("프로필이 성공적으로 수정되었습니다.");
      navigate("/my");
    } catch (error) {
      console.error("프로필 수정 실패:", error);
      alert("프로필 수정에 실패했습니다.");
    }
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
            onChange={(e) => setContact(formatPhoneNumber(e.target.value))}
          />
        </S.FormGroup>
        <S.FormGroup>
          <S.Label>비밀번호</S.Label>
          <S.PasswordInputWrapper>
            <Input
              type={showCurrentPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="현재 비밀번호"
            />
            <S.PasswordToggleButton onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
              <img
                src={showCurrentPassword ? hidePasswordIcon : showPasswordIcon}
                alt={showCurrentPassword ? 'Hide password' : 'Show password'}
                style={{ width: '20px', height: '20px' }}
              />
            </S.PasswordToggleButton>
          </S.PasswordInputWrapper>
        </S.FormGroup>
        <S.FormGroup>
          <S.Label>새 비밀번호</S.Label>
          <S.PasswordInputWrapper>
            <Input
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="새 비밀번호"
            />
            <S.PasswordToggleButton onClick={() => setShowNewPassword(!showNewPassword)}>
              <img
                src={showNewPassword ? hidePasswordIcon : showPasswordIcon}
                alt={showNewPassword ? 'Hide password' : 'Show password'}
                style={{ width: '20px', height: '20px' }}
              />
            </S.PasswordToggleButton>
          </S.PasswordInputWrapper>
        </S.FormGroup>
        <S.FormGroup>
          <S.Label>새 비밀번호 확인</S.Label>
          <S.PasswordInputWrapper>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="새 비밀번호 확인"
            />
            <S.PasswordToggleButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              <img
                src={showConfirmPassword ? hidePasswordIcon : showPasswordIcon}
                alt={showConfirmPassword ? 'Hide password' : 'Show password'}
                style={{ width: '20px', height: '20px' }}
              />
            </S.PasswordToggleButton>
          </S.PasswordInputWrapper>
        </S.FormGroup>
      </S.FormSection>
      <S.SubmitButton onClick={handleEdit}>수정</S.SubmitButton>
    </S.ProfileEditContainer>
  );
};

export default ProfileEdit;