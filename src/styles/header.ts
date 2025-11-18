import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { borderColor2, buttonColor, buttonHoverColor, textColor } from "./common";

export const HeaderContainer = styled.header`
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  background-color: white;
  width: 100%;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 1200px) {
    padding: 20px 30px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 15px 20px;
    align-items: flex-start;
    gap: 15px;
  }
`;

export const LeftHeader = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%; /* Take full width when stacked */
    justify-content: space-between; /* Space out logo and nav on mobile */
    gap: 15px;
  }

  @media (max-width: 480px) {
    flex-direction: column; /* Stack logo and nav vertically on very small screens */
    align-items: flex-start;
  }
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  white-space: nowrap; /* Prevent text wrapping */
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${borderColor2};
  padding: 10px 30px 10px 10px;
  gap: 16px;
  width: 250px; /* Give it a default width */

  img {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 768px) {
    width: 100%; /* Take full width on tablet/mobile */
    padding: 8px 15px 8px 8px;
  }
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  width: 100%;
  min-width: 0;

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
  min-width: 0;

  @media (max-width: 768px) {
    width: 100%; /* Take full width when stacked */
    justify-content: space-between; /* Space out search and auth buttons */
    gap: 15px;
  }

  @media (max-width: 480px) {
    flex-direction: column; /* Stack search and auth vertically on very small screens */
    align-items: flex-start;
  }
`;

export const NavList = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%; /* Take full width when stacked */
    justify-content: space-around; /* Distribute nav items */
  }

  @media (max-width: 480px) {
    flex-direction: column; /* Stack nav items vertically on very small screens */
    align-items: flex-start;
    gap: 10px;
  }
`;

export const Nav = styled(Link)<{ selected: boolean }>`
  padding: 0px 25px;
  cursor: pointer;
  color: ${({ selected }) => selected ? buttonColor : textColor};
  font-weight: ${({ selected }) => selected ? "700" : "500"};
  white-space: nowrap; /* Prevent text wrapping */

  @media (max-width: 768px) {
    padding: 0 10px; /* Reduce padding on smaller screens */
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 5px 0; /* Adjust padding for stacked nav items */
  }
`;

export const ProfileRow = styled.div`
  display: flex;
  gap: 20px;
`;

export const AdminButton = styled(Link)`
  border-radius: 5px;
  color: white;
  font-weight: 700;
  background-color: ${buttonColor};
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;

  :hover {
    background-color: ${buttonHoverColor};
  }

  @media (max-width: 480px) {
    width: 100%; /* Full width button on very small screens */
    text-align: center;
    padding: 8px 15px;
    font-size: 14px;
  }
`;

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
  white-space: nowrap;
  box-sizing: border-box;

  :hover {
    background-color: ${buttonHoverColor};
  }

  @media (max-width: 480px) {
    width: 100%; /* Full width button on very small screens */
    text-align: center;
    padding: 8px 15px;
    font-size: 14px;
  }
`;

export const LogoutButton = styled.button`
  border-radius: 5px;
  color: white;
  font-weight: 700;
  background-color: ${buttonColor};
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;

  :hover {
    background-color: ${buttonHoverColor};
  }

  @media (max-width: 480px) {
    width: 100%; /* Full width button on very small screens */
    text-align: center;
    padding: 8px 15px;
    font-size: 14px;
  }
`;

export const NavContainer = styled.div`
  position: relative;
`;

export const LNBContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid #eee;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: 100;
  padding-top: 20px;
`;

export const LNBItem = styled(Link)`
  color: ${textColor};
  font-weight: 500;
  white-space: nowrap;
  padding: 5px 10px;
  border-radius: 5px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const ProfileLink = styled(Link)``;

export const UserProfile = styled.div`
  border-radius: 100%;
  background-image: url('/account.png');
  background-size: cover;
  background-position: center;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  flex-shrink: 0; /* Ensure it maintains its size and doesn't shrink */

  @media (max-width: 480px) {
    width: 2.5rem; /* Slightly smaller profile pic on very small screens */
    height: 2.5rem;
  }
`;