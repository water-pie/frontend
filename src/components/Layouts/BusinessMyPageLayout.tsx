import { Link, Outlet, useLocation } from 'react-router-dom';
import * as S from 'styles/my/businessLayout';

const BusinessMyPageLayout = () => {
  const { pathname } = useLocation();

  return (
    <S.BusinessMyPageLayoutContainer>
      <S.BusinessMyPageNav>
        <Link to="/business"><h2>마이페이지</h2></Link>
        <S.BusinessNavBlock>
          <h3>내 정보</h3>
          <ul>
            <li>
              <S.BusinessNavLink to="/business/profileEdit" className={pathname === '/business/profileEdit' ? 'active' : ''}>
                프로필 수정
              </S.BusinessNavLink>
            </li>
            <li>
              <S.BusinessNavLink to="/business/pointManagement" className={pathname === '/business/pointManagement' ? 'active' : ''}>
                포인트 충전/내역
              </S.BusinessNavLink>
            </li>
          </ul>
        </S.BusinessNavBlock>
        <S.BusinessNavBlock>
          <h3>캠페인 관리</h3>
          <ul>
            <li>
              <S.BusinessNavLink to="/campaign/creation" className={pathname === '/business/campaignRegister' ? 'active' : ''}>
                캠페인 등록
              </S.BusinessNavLink>
            </li>
            <li>
              <S.BusinessNavLink to="/business/registeredCampaigns" className={pathname === '/business/registeredCampaigns' ? 'active' : ''}>
                등록한 캠페인
              </S.BusinessNavLink>
            </li>
          </ul>
        </S.BusinessNavBlock>
        <S.BusinessNavBlock>
          <h3>고객센터</h3>
          <ul>
            <li>
              <S.BusinessNavLink to="/business/inquiry" className={pathname === '/business/inquiry' ? 'active' : ''}>
                1:1 문의
              </S.BusinessNavLink>
            </li>
          </ul>
        </S.BusinessNavBlock>
      </S.BusinessMyPageNav>
      <S.BusinessMyPageContent>
        <Outlet />
      </S.BusinessMyPageContent>
    </S.BusinessMyPageLayoutContainer>
  );
};

export default BusinessMyPageLayout;
