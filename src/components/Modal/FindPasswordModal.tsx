import React, { useState } from 'react';
import * as S from 'styles/modal/findPasswordModal';
import Input from 'components/Input/Input';
import { generateLicenseCodeApi, verifyLicenseCodeApi } from 'apis/license';

interface FindPasswordModalProps {
  onClose: () => void;
}

export default function FindPasswordModal({ onClose }: FindPasswordModalProps) {
  const [step, setStep] = useState(1); // 1: email, 2: code, 3: new password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailSubmit = async () => {
    try {
      await generateLicenseCodeApi(email);
      setStep(2);
      setErrorMessage('');
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleCodeSubmit = async () => {
    try {
      await verifyLicenseCodeApi(email, code);
      setStep(3);
      setErrorMessage('');
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handlePasswordSubmit = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      // await resetPasswordApi({ email, code, newPassword: password });
      alert('비밀번호가 성공적으로 재설정되었습니다.');
      onClose();
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <h2>비밀번호 재설정</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {step === 1 && (
          <div className="input-group">
            <Input
              type="email"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="primary" onClick={handleEmailSubmit}>인증코드 받기</button>
          </div>
        )}
        {step === 2 && (
          <div className="input-group">
            <Input
              type="text"
              placeholder="인증코드를 입력해주세요."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button className="primary" onClick={handleCodeSubmit}>인증하기</button>
          </div>
        )}
        {step === 3 && (
          <div className="input-group">
            <Input
              type="password"
              placeholder="새 비밀번호를 입력해주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="새 비밀번호를 다시 입력해주세요."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="primary" onClick={handlePasswordSubmit}>비밀번호 재설정</button>
          </div>
        )}
        <div className="button-group">
          <button className="secondary" onClick={onClose}>닫기</button>
        </div>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}
