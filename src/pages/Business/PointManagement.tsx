import { useState } from 'react';
import * as S from 'styles/business/pointManagement';
import PointChargeModal from 'components/Modal/PointChargeModal';

const PointManagement = () => {
  const [activeTab, setActiveTab] = useState('usage');
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);

  const handleCharge = () => {
    setIsChargeModalOpen(true);
  };

  return (
    <S.PointManagementContainer>
      <S.Header>
        <S.Title>포인트 관리</S.Title>
        <S.ChargeButton onClick={handleCharge}>포인트 충전하기</S.ChargeButton>
      </S.Header>

      <S.PointSummary>
        <S.PointBox>
          <span>보유 포인트</span>
          <S.PointValue>0 P</S.PointValue>
        </S.PointBox>
        <S.Divider />
        <S.PointBox>
          <span>누적 충전 포인트</span>
          <S.PointValue>0 P</S.PointValue>
        </S.PointBox>
      </S.PointSummary>

      <S.Tabs>
        <S.TabButton
          active={activeTab === 'usage'}
          onClick={() => setActiveTab('usage')}
        >
          사용 내역
        </S.TabButton>
        <S.TabButton
          active={activeTab === 'charge'}
          onClick={() => setActiveTab('charge')}
        >
          충전 내역
        </S.TabButton>
      </S.Tabs>

      <S.Content>
        {activeTab === 'usage' && (
          <S.NoContent>사용 내용이 없습니다.</S.NoContent>
        )}
        {activeTab === 'charge' && (
          <S.NoContent>충전 내용이 없습니다.</S.NoContent>
        )}
      </S.Content>
      {isChargeModalOpen && <PointChargeModal onClose={() => setIsChargeModalOpen(false)} />}
    </S.PointManagementContainer>
  );
};

export default PointManagement;
