import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { borderColor1, textColor, buttonColor } from '../common';

export const Container = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  padding: 15px 20px;
  border: 1px solid ${borderColor1};
  text-decoration: none;
  color: ${textColor};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${borderColor1};
  }
`;

export const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
  flex-grow: 1;
  margin-right: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Info = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const Date = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${textColor};
`;

export const Status = styled.span<{ status: '답변 됨' | '답변 완료' }>`
  font-size: 14px;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${({ status }) => (status === '답변 됨' ? buttonColor : borderColor1)};
  color: ${({ status }) => (status === '답변 됨' ? 'white' : textColor)};
`;
