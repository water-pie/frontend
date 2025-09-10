import { NavLink, Outlet } from 'react-router-dom';
import * as S from '../../styles/my/layout';

const MyPageLayout = () => {
  return (
    <S.MyPageLayout>
      <S.MyPageNav>
        <h2>마이페이지</h2>
        <S.NavBlock>
          <h3>내 정보</h3>
          <ul>
            <li>
              <NavLink to="/mypage/profile">프로필 수정</NavLink>
            </li>
            <li>
              <NavLink to="/mypage/points">포인트 관리</NavLink>
            </li>
            <li>
              <NavLink to="/mypage/penalty">패널티 현황</NavLink>
            </li>
          </ul>
        </S.NavBlock>
        <S.NavBlock>
          <h3>캠페인 관리</h3>
          <ul>
            <li>
              <NavLink to="/mypage/campaigns/applied">신청한 캠페인</NavLink>
            </li>
            <li>
              <NavLink to="/mypage/campaigns/ongoing">진행중인 캠페인</NavLink>
            </li>
            <li>
              <NavLink to="/mypage/campaigns/finished">종료된 캠페인</NavLink>
            </li>
          </ul>
        </S.NavBlock>
        <S.NavBlock>
          <h3>고객센터</h3>
          <ul>
            <li>
              <NavLink to="/mypage/inquiry">1:1 문의</NavLink>
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
