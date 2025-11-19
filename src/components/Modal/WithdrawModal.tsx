import { useState } from 'react';
import * as S from 'styles/modal/withdrawModal'; // 스타일 파일 따로 관리해도 OK

export default function WithdrawModal({ onClose, onSubmit, currentPoint }: any) {
  const [amount, setAmount] = useState(0);
  const [bankCode, setBankCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [holderName, setHolderName] = useState('');

  const addAmount = (value: number) => {
    setAmount(prev => prev + value);
  };

  const setAll = () => {
    setAmount(currentPoint);
  };

  const isValid = amount >= 5000 && bankCode && accountNumber && holderName;

  return (
    <S.ModalOverlay>
      <S.Modal>
        <S.ModalTitle>포인트 출금 신청</S.ModalTitle>

        <S.Label>출금 금액</S.Label>
        <S.AmountBox>{amount.toLocaleString()} P</S.AmountBox>

        <S.ButtonRow>
          <button onClick={() => addAmount(1000)}>+1,000</button>
          <button onClick={() => addAmount(3000)}>+3,000</button>
          <button onClick={() => addAmount(5000)}>+5,000</button>
          <button onClick={setAll}>전액</button>
        </S.ButtonRow>

        <S.Label>은행 코드</S.Label>
        <S.StyledInput
          placeholder="예: 004"
          value={bankCode}
          onChange={(e) => setBankCode(e.target.value)}
        />

        <S.Label>계좌번호</S.Label>
        <S.StyledInput
          placeholder="숫자만 입력"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />

        <S.Label>예금주</S.Label>
        <S.StyledInput
          placeholder="홍길동"
          value={holderName}
          onChange={(e) => setHolderName(e.target.value)}
        />

        <S.ModalActions>
          <button onClick={onClose}>취소</button>
          <button
            disabled={!isValid}
            onClick={() =>
              onSubmit({
                amount,
                bankCode,
                accountNumber,
                holderName,
              })
            }
          >
            출금 신청
          </button>
        </S.ModalActions>

        <S.Warning>* 출금은 최소 5,000P 이상부터 가능합니다.</S.Warning>
      </S.Modal>
    </S.ModalOverlay>
  );
}