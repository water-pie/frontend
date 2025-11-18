import { Outlet } from "react-router-dom";
import * as S from "styles/admin";

const AdminLayout = () => {
  return (
    <S.AdminWrapper>
      <S.Sidebar>
        <h2>관리자 메뉴</h2>
        <nav>
          <S.NavLink to="/admin">대시보드</S.NavLink>
          <S.NavLink to="/admin/users">사용자 관리</S.NavLink>
          <S.NavLink to="/admin/posts">콘텐츠 관리</S.NavLink>
          <S.NavLink to="/admin/inquiries">문의 관리</S.NavLink>
          <S.NavLink to="/admin/points">포인트 관리</S.NavLink>
        </nav>
      </S.Sidebar>
      <S.Content>
        <Outlet />
      </S.Content>
    </S.AdminWrapper>
  );
};

export default AdminLayout;