import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "styles/header";
import useUserStore from "store/useUserStore";
import Search from "assets/images/search.png"
import LogoImage from "/Logo.svg";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout, userInfo } = useUserStore();
  const userType = userInfo?.type;
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfileLNB, setShowProfileLNB] = useState(false);
  const [showNoticeLNB, setShowNoticeLNB] = useState(false);

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

  const influencerProfileLNB = [
    { to: "/my", label: "마이페이지" },
    { to: "/my/points", label: "포인트 관리" },
    { to: "/my/campaigns/applied", label: "신청한 캠페인" },
    { to: "/my/campaigns/ongoing", label: "진행중인 캠페인" },
    { to: "/my/campaigns/finished", label: "종료된 캠페인" },
    { to: "/my/inquiry", label: "1:1 문의" },
  ];

  const brandProfileLNB = [
    { to: "/business", label: "마이페이지" },
    { to: "/business/pointManagement", label: "포인트 충전/내역" },
    { to: "/business/managementCampaigns", label: "캠페인 관리" },
    { to: "/business/pastCampaigns", label: "지난 캠페인 현황" },
    { to: "/business/inquiry", label: "1:1 문의" },
  ];

  const noticeLNB = [
    { to: "/post?type=notice", label: "공지사항" },
    { to: "/post?type=event", label: "이벤트" },
  ];

  const profileLNBItems = userType === "INFLUENCER" ? influencerProfileLNB : brandProfileLNB;

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <S.LeftHeader>
          <S.Logo to="/">
            <img src={LogoImage} alt="리뷰헬퍼 로고" style={{ height: '24px', marginRight: '8px' }} />
            리뷰헬퍼
          </S.Logo>
          <S.NavList>
            <S.Nav to="/product" selected={pathname === "/product"}>제품</S.Nav>
            <S.Nav to="/location" selected={pathname === "/location"}>지역</S.Nav>
            <S.Nav to="/promotion" selected={pathname === "/promotion"}>기자단</S.Nav>
            <S.NavContainer
              onMouseEnter={() => setShowNoticeLNB(true)}
              onMouseLeave={() => setShowNoticeLNB(false)}
            >
              <S.Nav to="/post" selected={pathname.startsWith("/post")}>공지/이벤트</S.Nav>
              {showNoticeLNB && (
                <S.LNBContainer>
                  {noticeLNB.map((item) => (
                    <S.LNBItem
                      key={item.to}
                      to={item.to}
                      onClick={() => setShowNoticeLNB(false)}
                    >{item.label}</S.LNBItem>
                  ))}
                </S.LNBContainer>
              )}
            </S.NavContainer>
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
            <S.ProfileRow>
              {userType === "ADMIN"
                ? <S.AdminButton to="/admin">관리자 이동</S.AdminButton>
                : (
                  <S.NavContainer
                    onMouseEnter={() => setShowProfileLNB(true)}
                    onMouseLeave={() => setShowProfileLNB(false)}
                  >
                    <S.ProfileLink to={(userType === "BRAND_MANAGER" || userType === "MARKETING_AGENCY") ? "/business" : "/my"}>
                      <S.UserProfile />
                    </S.ProfileLink>
                    {showProfileLNB && (
                      <S.LNBContainer>
                        {profileLNBItems.map((item) => (
                          <S.LNBItem
                            key={item.to}
                            to={item.to}
                            onClick={() => setShowProfileLNB(false)}
                          >{item.label}</S.LNBItem>
                        ))}
                      </S.LNBContainer>
                    )}
                  </S.NavContainer>
                )
              }
              <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
            </S.ProfileRow>
          ) : (
            <S.AuthButton to="/login">로그인</S.AuthButton>
          )}
        </S.RightHeader>
      </S.HeaderContent>
    </S.HeaderContainer>
  )
};

export default Header;