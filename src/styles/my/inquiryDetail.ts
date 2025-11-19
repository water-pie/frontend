import styled from '@emotion/styled';
import { borderColor1, textColor, buttonColor } from '../common';

export const InquiryDetailContainer = styled.div`
  width: 100%; // Fixed width
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
  flex-grow: 1;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 10px;
  }
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
  }
`;

export const Date = styled.span`
  font-size: 14px;
  color: ${textColor};
`;

export const Status = styled.span<{ status: string }>`
  font-size: 14px;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${({ status }) => (status === '답변 완료' ? buttonColor : borderColor1)};
  color: ${({ status }) => (status === '답변 완료' ? 'white' : textColor)};

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

export const EditButton = styled.button`
  background-color: #4CAF50; /* Green */
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;

  &:hover {
    background-color: #45a049;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-top: 10px;
  }
`;

export const DeleteButton = styled.button`
  background-color: #f44336; /* Red */
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;

  &:hover {
    background-color: #da190b;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-top: 10px;
  }
`;

export const ContentSection = styled.div`
  margin-bottom: 40px;
  padding: 20px 0;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    padding: 10px 0;
  }
`;

export const ContentText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${textColor};
  white-space: pre-wrap; // Preserve line breaks from content string

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const AnswerSection = styled.div`
  border-top: 1px solid ${borderColor1};
  padding-top: 30px;

  @media (max-width: 768px) {
    padding-top: 20px;
  }
`;

export const AnswerTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  color: ${textColor};

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

export const AnswerText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${textColor};
  white-space: pre-wrap; // Preserve line breaks from content string

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;