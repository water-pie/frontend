import { useState } from 'react';
import * as S from 'styles/my/pointManagement';

const PointManagement = () => {
  const [activeTab, setActiveTab] = useState('earning');

  const handleWithdraw = () => {
    alert('포인트 출금 기능을 구현해야 합니다.');
  };

  return (
    <S.PointManagementContainer>
      <S.Header>
        <S.Title>포인트 관리</S.Title>
        <S.WithdrawButton onClick={handleWithdraw}>포인트 출금하기</S.WithdrawButton>
      </S.Header>

      <S.PointSummary>
        <S.PointBox>
          <span>보유 포인트</span>
          <S.PointValue>0 P</S.PointValue>
        </S.PointBox>
        <S.Divider />
        <S.PointBox>
          <span>누적 포인트</span>
          <S.PointValue>0 P</S.PointValue>
        </S.PointBox>
      </S.PointSummary>

      <S.Tabs>
        <S.TabButton
          active={activeTab === 'earning'}
          onClick={() => setActiveTab('earning')}
        >
          적립 내역
        </S.TabButton>
        <S.TabButton
          active={activeTab === 'withdrawal'}
          onClick={() => setActiveTab('withdrawal')}
        >
          출금 내역
        </S.TabButton>
      </S.Tabs>

      <S.Content>
        {activeTab === 'earning' && (
          <S.NoContent>적립 내용이 없습니다.</S.NoContent>
        )}
        {activeTab === 'withdrawal' && (
          <S.NoContent>출금 내용이 없습니다.</S.NoContent>
        )}
      </S.Content>
    </S.PointManagementContainer>
  );
};

export default PointManagement;