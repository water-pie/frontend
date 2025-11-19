import styled from '@emotion/styled';
import { buttonColor, buttonHoverColor, borderColor1, textColor, borderColor2 } from '../common';

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

export const ChargeButton = styled.button`
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

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px 0;
  }
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

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
    justify-content: space-between;
    padding: 0 20px;
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

  @media (max-width: 768px) {
    width: 80%;
    height: 1px;
    margin: 10px 0;
  }
`;

export const Tabs = styled.div`
  display: flex;
  border-bottom: 2px solid ${borderColor1};
  margin-bottom: 20px;

  @media (max-width: 768px) {
    justify-content: space-around;
  }
`;

export const TabButton = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  color: ${({ active }) => (active ? buttonColor : textColor)};

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 10px;
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

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 30px 0;
  }
`;

export const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const HistoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid ${borderColor1};

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px 10px;
  }
`;

export const HistoryInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HistoryType = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: ${textColor};
  margin-bottom: 5px;
`;

export const HistoryDate = styled.span`
  font-size: 14px;
  color: ${borderColor2};
`;

export const HistoryAmount = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: ${buttonColor};

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

