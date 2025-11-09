import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import {
  ANONYMOUS,
  loadTossPayments,
  type TossPaymentsWidgets,
  type WidgetPaymentMethodWidget,
} from "@tosspayments/tosspayments-sdk";
import useUserStore from "store/useUserStore";
import { initialize } from "apis/points";
import { getUserInfoApi } from "apis/user";

const clientKey = import.meta.env.TOSS_CLIENT_KEY;

interface PaymentProps {
  amount: { currency: string; value: number };
  onClose: () => void;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  max-width: 540px;
  width: 100%;
`;

const PaymentButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
`;

const generateOrderId = () =>
  new Date().getTime() + Math.random().toString(36).substring(2, 9);

export default function TossPaymentWidget({ amount, onClose }: PaymentProps) {
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const paymentMethodWidgetRef = useRef<WidgetPaymentMethodWidget | null>(null);
  const { userInfo } = useUserStore();
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "" });

  useEffect(() => {
    if (userInfo?.token) {
      getUserInfoApi(userInfo.token).then((data) =>
        setCustomerInfo({ name: data.name, email: data.email })
      );
    }
  }, [userInfo?.token]);

  useEffect(() => {
    async function setupWidgets() {
      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
      await widgets.setAmount(amount);

      const paymentMethodWidget = await widgets.renderPaymentMethods({
        selector: "#payment-method",
        variantKey: "DEFAULT",
      });

      await widgets.renderAgreement({
        selector: "#agreement",
        variantKey: "AGREEMENT",
      });

      paymentMethodWidgetRef.current = paymentMethodWidget;
      setWidgets(widgets);
    }
    setupWidgets();
  }, [amount]);

  const handlePayment = async () => {
    if (!userInfo?.token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const orderId = generateOrderId();
    const orderName = `포인트 ${amount.value.toLocaleString()}P 충전`;

    try {
      // 1️⃣ 결제 초기화 (서버에 주문 생성)
      await initialize(userInfo.token, {
        amount: amount.value,
        chargedPoints: amount.value,
        orderId,
        orderName,
      });

      // 2️⃣ Toss 결제 요청
      await widgets?.requestPayment({
        orderId,
        orderName,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        successUrl: `http://localhost:5173/payment/success?orderId=${orderId}`,
        failUrl: `http://localhost:517/payment/fail`,
      });
      alert("결제가 완료되었습니다!");
      onClose();

    } catch (error) {
      console.error(error);
      alert("결제 중 오류가 발생했습니다.");
    }
  };

  return (
    <Wrapper>
      <Container>
        <div id="payment-method" />
        <div id="agreement" />
        <PaymentButton onClick={handlePayment}>Toss로 결제하기</PaymentButton>
      </Container>
    </Wrapper>
  );
}