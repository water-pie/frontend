import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { borderColor2, buttonColor, buttonHoverColor, textColor } from "./common";

export const HeaderContainer = styled.header`  
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #eee;
  background-color: white;
  padding: 20px;
`;

export const LeftHeader = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`

export const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${borderColor2};
  padding: 10px 30px 10px 10px;
  gap: 16px;

  img {
    width: 18px;
    height: 18px;
  }
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  width: 200px;

  &::placeholder {
    color: gray;
    font-weight: 500;
    font-size: 16px;
  }
`;

export const RightHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`

export const NavList = styled.div`
  display: flex;
  align-items: center;
`;

export const Nav = styled(Link)<{ selected: boolean }>`
  padding: 0px 25px;
  cursor: pointer;
  color: ${({ selected }) => selected ? buttonColor : textColor};
  font-weight: ${({ selected }) => selected ? "700" : "500"};
`

export const AuthButton = styled(Link)`
  border-radius: 5px;
  color: white;
  font-weight: 700;
  background-color: ${buttonColor};
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  :hover {
    background-color: ${buttonHoverColor};
  }
`;

export const UserProfile = styled(Link)`
  border-radius: 100%;
  background-color: #d7d7d7;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`