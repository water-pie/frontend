import { useEffect, useState } from 'react';
import * as S from 'styles/my/pointManagement';
import useUserStore from 'store/useUserStore';
import { requestWithdrawal, getPoint, historyPayment } from 'apis/points';
import WithdrawModal from 'components/Modal/WithdrawModal';

// 인플루언서 point
const PointManagement = () => {
  const [activeTab, setActiveTab] = useState('earning');
  const { userInfo } = useUserStore();

  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [currentPoint, setCurrentPoint] = useState<number | null>(null);
  const [chargeHistory, setChargeHistory] = useState<any[]>([]);
  const [accumulatedCharge, setAccumulatedCharge] = useState<number | null>(null);

  const submitWithdrawal = async (payload: any) => {
    try {
      await requestWithdrawal(userInfo!.token, payload);
      alert("출금 신청이 완료되었습니다.");
      setWithdrawModalOpen(false);
      fetchPointData(); // 출금 후 포인트 데이터 갱신
    } catch (err) {
      console.error(err);
      alert("출금 신청에 실패했습니다.");
    }
  };

  const fetchPointData = async () => {
    if (userInfo?.token) {
      try {
        const pointData = await getPoint();
        setCurrentPoint(pointData.points);

        const historyData = await historyPayment(userInfo.token);
        setChargeHistory(historyData);
        setAccumulatedCharge(historyData.reduce((sum: number, item: any) => sum + item.chargedPoints, 0));
      } catch (error) {
        console.error("포인트 데이터 조회 실패", error);
        setCurrentPoint(0);
        setChargeHistory([]);
        setAccumulatedCharge(0);
      }
    }
  };

  useEffect(() => {
    fetchPointData();
  }, [userInfo?.token]);

  const handleWithdraw = () => {
    setWithdrawModalOpen(true);
  };

  return (
    <S.PointManagementContainer>
      <S.Header>
        <S.Title>포인트 관리</S.Title>
        <S.WithdrawButton onClick={handleWithdraw}>포인트 출금하기</S.WithdrawButton>
      </S.Header>

      {isWithdrawModalOpen && (
        <WithdrawModal
          currentPoint={currentPoint}
          onClose={() => setWithdrawModalOpen(false)}
          onSubmit={submitWithdrawal}
        />
      )}

      <S.PointSummary>
        <S.PointBox>
          <span>보유 포인트</span>
          <S.PointValue>{currentPoint !== null ? `${currentPoint} P` : '로딩 중...'}</S.PointValue>
        </S.PointBox>
        <S.Divider />
        <S.PointBox>
          <span>누적 포인트</span>
          <S.PointValue>{accumulatedCharge !== null ? `${accumulatedCharge} P` : '로딩 중...'}</S.PointValue>
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
          chargeHistory.length > 0 ? (
            <S.HistoryList>
              {chargeHistory.map((item, index) => (
                <S.HistoryItem key={index}>
                  <S.HistoryInfo>
                    <S.HistoryType>{item.orderName}</S.HistoryType>
                    <S.HistoryDate>{new Date(item.createdAt).toLocaleDateString()}</S.HistoryDate>
                  </S.HistoryInfo>
                  <S.HistoryAmount>{item.chargedPoints > 0 ? `+${item.chargedPoints} P` : `${item.chargedPoints} P`}</S.HistoryAmount>
                </S.HistoryItem>
              ))}
            </S.HistoryList>
          ) : (
            <S.NoContent>적립 내용이 없습니다.</S.NoContent>
          )
        )}
        {activeTab === 'withdrawal' && (
          <S.NoContent>출금 내용이 없습니다.</S.NoContent>
        )}
      </S.Content>
    </S.PointManagementContainer>
  );
};

export default PointManagement;