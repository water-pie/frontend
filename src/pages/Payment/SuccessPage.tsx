import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { confirmPayment } from "apis/points";
import useUserStore from "store/useUserStore";

export default function PaymentSuccessPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { userInfo } = useUserStore();

  useEffect(() => {
    const paymentKey = params.get("paymentKey");
    const orderId = params.get("orderId");
    const amount = params.get("amount");

    if (!paymentKey || !orderId || !amount) {
      alert("결제 정보가 올바르지 않습니다.");
      navigate("/");
      return;
    }

    const confirm = async () => {
      try {
        await confirmPayment(userInfo!.token, {
          paymentKey,
          orderId,
          amount: parseInt(amount, 10),
          status: "SUCCESS",
        });

        alert("결제가 완료되었습니다!");
        navigate("/my/point-management");
      } catch (error) {
        console.error(error);
        alert("결제 확인 중 오류가 발생했습니다.");
        navigate("/");
      }
    };

    confirm();
  }, [params, navigate, userInfo]);

  return <p>결제 확인 중입니다...</p>;
};