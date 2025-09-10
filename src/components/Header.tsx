import { useLocation } from "react-router-dom";
import * as S from "styles/header";
import useUserStore from "store/useUserStore";

export const Header = () => {
  const { pathname } = useLocation();
  const { isLoggedIn } = useUserStore();

  return (
    <S.HeaderContainer>
      <S.LeftHeader>
        <S.Logo to="/">WaterPie</S.Logo>
        <S.NavList>
          <S.Nav to="/product" selected={pathname === "/product"}>제품</S.Nav>
          <S.Nav to="/location" selected={pathname === "/location"}>지역</S.Nav>
          <S.Nav to="/promotion" selected={pathname === "/promotion"}>기자단</S.Nav>
          <S.Nav to="/notices" selected={pathname === "/notices"}>공지/이벤트</S.Nav>
        </S.NavList>
      </S.LeftHeader>
      <S.RightHeader>
        <S.SearchBar>
          <img src="/search.png" />
          <S.SearchInput type="text" placeholder="원하는 체험단을 검색하세요!" />
        </S.SearchBar>
        {isLoggedIn ? 
          <S.UserProfile to="/my">
            
          </S.UserProfile> : 
          <S.AuthButton to="/login">로그인</S.AuthButton>
        }
      </S.RightHeader>
    </S.HeaderContainer>
  )
};

export default Header;