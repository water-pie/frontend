import { Link, NavLink, Outlet } from 'react-router-dom';
import * as S from 'styles/my/layout';

const MyPageLayout = () => {
  return (
    <S.MyPageLayout>
      <S.MyPageNav>
        <Link to="/my"><h2>마이페이지</h2></Link>
        <S.NavBlock>
          <h3>내 정보</h3>
          <ul>
            <li>
              <NavLink to="/my/profile">프로필 수정</NavLink>
            </li>
            <li>
              <NavLink to="/my/points">포인트 관리</NavLink>
            </li>
            <li>
              <NavLink to="/my/penalty">패널티 현황</NavLink>
            </li>
          </ul>
        </S.NavBlock>
        <S.NavBlock>
          <h3>캠페인 관리</h3>
          <ul>
            <li>
              <NavLink to="/my/campaigns/applied">신청한 캠페인</NavLink>
            </li>
            <li>
              <NavLink to="/my/campaigns/ongoing">진행중인 캠페인</NavLink>
            </li>
            <li>
              <NavLink to="/my/campaigns/finished">종료된 캠페인</NavLink>
            </li>
          </ul>
        </S.NavBlock>
        <S.NavBlock>
          <h3>고객센터</h3>
          <ul>
            <li>
              <NavLink to="/my/inquiry">1:1 문의</NavLink>
            </li>
          </ul>
        </S.NavBlock>
      </S.MyPageNav>
      <S.MyPageContent>
        <Outlet />
      </S.MyPageContent>
    </S.MyPageLayout>
  );
};

export default MyPageLayout;
