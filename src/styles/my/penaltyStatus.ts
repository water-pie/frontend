import styled from '@emotion/styled';
import { borderColor1, textColor } from '../common';

export const PenaltyStatusContainer = styled.div`
  width: 1180px; // Fixed width
  padding: 20px;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${borderColor1};
`;

export const Description = styled.p`
  font-size: 14px;
  color: ${textColor};
  line-height: 1.6;
  margin-bottom: 50px; // Space before the message
`;

export const NoPenaltyMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: ${textColor};
  padding: 50px 0;
`;
