import React, { useState } from "react";
import * as S from "styles/modal/pointChargeModal";
import TossPaymentWidget from "components/Modal/TossPaymentWidget";

interface PointChargeModalProps {
  onClose: () => void;
  onPaymentComplete: (paymentData: { paymentKey: string; orderId: string; amount: number }) => void;
}

export default function PointChargeModal({ onClose, onPaymentComplete }: PointChargeModalProps) {
  const [amount, setAmount] = useState(0);
  const [showTossWidget, setShowTossWidget] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/[^0-9]/g, ""), 10);
    setAmount(isNaN(value) ? 0 : value);
  };

  const addAmount = (value: number) => setAmount((prev) => prev + value);

  const handlePayment = () => {
    if (amount <= 0) {
      alert("충전할 금액을 입력해주세요.");
      return;
    }
    setShowTossWidget(true);
  };

  // TossPaymentWidget에서 결제 완료 시 호출될 콜백
  const handleTossPaymentSuccess = (paymentResult: any) => {
    // paymentResult에서 paymentKey, orderId 등 필요한 값 추출
    const paymentData = {
      paymentKey: paymentResult.paymentKey,
      orderId: paymentResult.orderId,
      amount,
    };

    // 상위 컴포넌트에 전달
    onPaymentComplete(paymentData);

    // 모달 닫기
    onClose();
  };

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>포인트 충전하기</h2>

        {!showTossWidget ? (
          <>
            <input
              type="text"
              placeholder="결제할 포인트를 입력해주세요."
              value={amount > 0 ? amount.toLocaleString() : ""}
              onChange={handleAmountChange}
            />
            <div className="point-buttons">
              <button onClick={() => addAmount(5000)}>+5,000 P</button>
              <button onClick={() => addAmount(10000)}>+10,000 P</button>
              <button onClick={() => addAmount(50000)}>+50,000 P</button>
              <button onClick={() => addAmount(100000)}>+100,000 P</button>
            </div>
            <S.PayButton onClick={handlePayment}>결제하기</S.PayButton>
          </>
        ) : (
          <TossPaymentWidget
            amount={{ currency: "KRW", value: amount }}
            onClose={onClose}
            onSuccess={handleTossPaymentSuccess} // 결제 성공 콜백
          />
        )}
      </S.ModalContent>
    </S.ModalOverlay>
  );
}
