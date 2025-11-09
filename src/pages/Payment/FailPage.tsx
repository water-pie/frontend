import { useSearchParams } from "react-router-dom";

export default function PaymentFailPage() {
  const [params] = useSearchParams();

  return (
    <div>
      <h2>결제 실패</h2>
      <p>사유: {params.get("message")}</p>
      <button onClick={() => (window.location.href = "/")}>돌아가기</button>
    </div>
  );
};