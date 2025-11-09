import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as S from 'styles/my/pointManagement';
import { confirmPayment } from 'apis/points';
import useUserStore from 'store/useUserStore';

const PointManagement = () => {
  const [activeTab, setActiveTab] = useState('earning');
  const [searchParams, setSearchParams] = useSearchParams();
  const { userInfo } = useUserStore();

  useEffect(() => {
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');

    if (paymentKey && orderId && amount && userInfo?.token) {
      confirmPayment(userInfo.token, {
        paymentKey,
        orderId,
        amount: Number(amount),
        status: 'DONE', // Assuming 'DONE' is the status for a successful payment
      })
        .then(() => {
          alert('포인트 충전이 완료되었습니다.');
          // TODO: Refresh point history
          searchParams.delete('paymentKey');
          searchParams.delete('orderId');
          searchParams.delete('amount');
          setSearchParams(searchParams);
        })
        .catch((error) => {
          console.error('Payment confirmation failed', error);
          alert('포인트 충전 확인에 실패했습니다.');
        });
    }
  }, [searchParams, setSearchParams, userInfo?.token]);

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