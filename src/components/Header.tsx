import * as S from "styles/header";

export const Header = () => {
  return (
    <S.HeaderContainer>
      <S.LeftHeader>
        <S.Logo to="/">WaterPie</S.Logo>
        <S.SearchBar>
          <img src="/search.png" />
          <S.SearchInput type="text" placeholder="원하는 체험단을 검색하세요!" />
        </S.SearchBar>
      </S.LeftHeader>
      <S.RightHeader>
        <S.NavList>
          <S.Nav to="/">제품</S.Nav>
          <S.Nav to="/">지역</S.Nav>
          <S.Nav to="/">기자단</S.Nav>
          <S.Nav to="/">공지/이벤트</S.Nav>
        </S.NavList>
        <S.AuthButton to="/login">로그인</S.AuthButton>
      </S.RightHeader>
    </S.HeaderContainer>
  )
};

export default Header;