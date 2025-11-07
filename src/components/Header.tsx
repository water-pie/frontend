import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "styles/header";
import useUserStore from "store/useUserStore";
import Search from "assets/images/search.png"
import LogoImage from "/Logo.svg";

export const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout, userInfo } = useUserStore();
  const userType = userInfo?.type;
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/search?keyword=${searchTerm}`);
    }
  };

  return (
    <S.HeaderContainer>
      <S.LeftHeader>
        <S.Logo to="/">
          <img src={LogoImage} alt="리뷰헬퍼 로고" style={{ height: '24px', marginRight: '8px' }} />
          리뷰헬퍼
        </S.Logo>
        <S.NavList>
          <S.Nav to="/product" selected={pathname === "/product"}>제품</S.Nav>
          <S.Nav to="/location" selected={pathname === "/location"}>지역</S.Nav>
          <S.Nav to="/promotion" selected={pathname === "/promotion"}>기자단</S.Nav>
          <S.Nav to="/notices" selected={pathname === "/notices"}>공지/이벤트</S.Nav>
        </S.NavList>
      </S.LeftHeader>
      <S.RightHeader>
        <S.SearchBar>
          <img src={Search} />
          <S.SearchInput 
            type="text" 
            placeholder="원하는 체험단을 검색하세요!" 
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleSearchKeyPress}
          />
        </S.SearchBar>
        {isLoggedIn ? (
          <>
            <S.UserProfile to={(userType === "BRAND_MANAGER" || userType === "MARKETING_AGENCY") ? "/business" : "/my"} />
            <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
          </>
        ) : (
          <S.AuthButton to="/login">로그인</S.AuthButton>
        )}
      </S.RightHeader>
    </S.HeaderContainer>
  )
};

export default Header;