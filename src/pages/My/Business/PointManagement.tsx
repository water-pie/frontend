import { useState, useEffect } from 'react';
import * as S from 'styles/business/pointManagement';
import PointChargeModal from 'components/Modal/PointChargeModal';
import useUserStore from 'store/useUserStore';
import { getPoint, historyPayment, confirmPayment } from 'apis/points';

// 매니저 point
const PointManagement = () => {
  const [activeTab, setActiveTab] = useState('usage');
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);
  const { userInfo } = useUserStore();

  const [currentPoint, setCurrentPoint] = useState<number | null>(null);
  const [accumulatedCharge, setAccumulatedCharge] = useState<number | null>(null);
  const [chargeHistory, setChargeHistory] = useState<any[]>([]);

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

  const handleChargeClick = () => {
    setIsChargeModalOpen(true);
  };

  // PointChargeModal에서 결제 완료 시 호출되는 함수
  const handlePaymentComplete = async (paymentData: { paymentKey: string; orderId: string; amount: number }) => {
    try {
      if (!userInfo?.token) throw new Error("로그인이 필요합니다.");

      // 1. 서버에 결제 확인 요청
      await confirmPayment(userInfo.token, {
        paymentKey: paymentData.paymentKey,
        orderId: paymentData.orderId,
        amount: paymentData.amount,
        status: "DONE", // 성공 처리
      });

      alert("포인트 충전이 완료되었습니다.");

      // 2. 포인트 데이터 갱신
      fetchPointData();

      // 3. 모달 닫기
      setIsChargeModalOpen(false);
    } catch (error) {
      console.error("결제 확인 실패", error);
      alert("포인트 충전 확인에 실패했습니다.");
    }
  };

  return (
    <S.PointManagementContainer>
      <S.Header>
        <S.Title>포인트 관리</S.Title>
        <S.ChargeButton onClick={handleChargeClick}>포인트 충전하기</S.ChargeButton>
      </S.Header>

      <S.PointSummary>
        <S.PointBox>
          <span>사용 가능 포인트</span>
          <S.PointValue>{currentPoint !== null ? `${currentPoint} P` : '로딩 중...'}</S.PointValue>
        </S.PointBox>
        <S.Divider />
        <S.PointBox>
          <span>누적 충전 포인트</span>
          <S.PointValue>{accumulatedCharge !== null ? `${accumulatedCharge} P` : '로딩 중...'}</S.PointValue>
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
        {activeTab === 'usage' && <S.NoContent>사용 내용이 없습니다.</S.NoContent>}
        {activeTab === 'charge' && (
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
            <S.NoContent>충전 내용이 없습니다.</S.NoContent>
          )
        )}
      </S.Content>

      {isChargeModalOpen && (
        <PointChargeModal
          onClose={() => setIsChargeModalOpen(false)}
          onPaymentComplete={handlePaymentComplete} // 결제 완료 콜백 전달
        />
      )}
    </S.PointManagementContainer>
  );
};

export default PointManagement;