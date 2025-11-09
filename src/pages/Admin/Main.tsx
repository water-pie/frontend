import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>관리자 대시보드</h2>
      <p>여기에서 전체 사이트 현황을 확인하고 관리할 수 있습니다.</p>
      <button onClick={() => navigate("/")}>관리자 페이지 나가기 {"->"}</button>
    </div>
  );
};

export default AdminPage;
