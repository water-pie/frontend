import styled from '@emotion/styled';
import { borderColor1, textColor, buttonColor, buttonHoverColor } from '../common';

export const InquiryContainer = styled.div`
  width: 100%; // Fixed width as requested
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${borderColor1};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
  }
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 10px;
  }
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

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 15px;
    font-size: 14px;
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

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 30px 0;
  }
`;
