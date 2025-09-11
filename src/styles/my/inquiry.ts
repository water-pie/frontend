import styled from '@emotion/styled';
import { borderColor1, textColor, buttonColor, buttonHoverColor } from '../common';

export const InquiryContainer = styled.div`
  width: 1180px; // Fixed width as requested
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${borderColor1};
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin: 0;
`;

export const RegisterButton = styled.button`
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

export const InquiryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const NoInquiryMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: ${textColor};
  padding: 50px 0;
`;
