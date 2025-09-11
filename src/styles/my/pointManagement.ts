import styled from '@emotion/styled';
import { buttonColor, buttonHoverColor, borderColor1, textColor } from '../common';

export const PointManagementContainer = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid ${borderColor1};
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin: 0;
`;

export const WithdrawButton = styled.button`
  background-color: ${buttonColor};
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${buttonHoverColor};
  }
`;

export const PointSummary = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 30px 0;
`;

export const PointBox = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  span {
    font-size: 18px;
    color: ${textColor};
  }
`;

export const PointValue = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: ${buttonColor};
  margin: 0;
`;

export const Divider = styled.div`
  width: 1px;
  height: 60px;
  background-color: ${borderColor1};
`;

export const Tabs = styled.div`
  display: flex;
  border-bottom: 2px solid ${borderColor1};
  margin-bottom: 20px;
`;

export const TabButton = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  color: ${({ active }) => (active ? textColor : borderColor1)};
  border-bottom: ${({ active }) => (active ? `2px solid ${buttonColor}` : 'none')};
  margin-bottom: -3px; // To make the active tab border overlap the bottom border
  transition: color 0.2s, border-bottom 0.2s;

  &:hover {
    color: ${textColor};
  }
`;

export const Content = styled.div`
  padding: 20px 0;
`;

export const NoContent = styled.p`
  text-align: center;
  color: ${borderColor1};
  font-size: 18px;
  padding: 50px 0;
`;
