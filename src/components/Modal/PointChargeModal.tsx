import React, { useState } from 'react';
import * as S from 'styles/modal/pointChargeModal';

interface PointChargeModalProps {
  onClose: () => void;
}

export default function PointChargeModal({ onClose }: PointChargeModalProps) {
  const [amount, setAmount] = useState(0);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
    setAmount(isNaN(value) ? 0 : value);
  };

  const addAmount = (value: number) => {
    setAmount(prev => prev + value);
  }

  const handlePayment = () => {
    // TODO: Implement payment logic
    alert(`${amount.toLocaleString()}P를 충전합니다.`);
    onClose();
  };

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>포인트 충전하기</h2>
        <input 
          type="text" 
          placeholder="결제할 포인트를 입력해주세요." 
          value={amount > 0 ? amount.toLocaleString() : ''}
          onChange={handleAmountChange}
        />
        <div className="point-buttons">
          <button className="point-button" onClick={() => addAmount(5000)}>+ 5,000 P</button>
          <button className="point-button" onClick={() => addAmount(10000)}>+ 10,000 P</button>
          <button className="point-button" onClick={() => addAmount(50000)}>+ 50,000 P</button>
          <button className="point-button" onClick={() => addAmount(100000)}>+ 100,000 P</button>
        </div>
        <button className="submit-button" onClick={handlePayment}>결제하기</button>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}
