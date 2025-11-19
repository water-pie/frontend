import styled from '@emotion/styled';
import { borderColor1, borderColor2, buttonColor, buttonHoverColor, textColor } from './common';

const DOT_SIZE = 20; // StepCircle 크기(px)
const DOT_RADIUS = DOT_SIZE / 2;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  padding: 0 20px;
  gap: 20px;
  width: 400px;
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;

  & > div {
    width: 100%;
  }
`;

export const AuthButton = styled.button`
  word-break: keep-all;
  font-size: 18px;
  font-weight: 600;
  background-color: #96d3ff;
  color: white;
  border-radius: 10px;
  border: none;
  padding: 0px 20px;
  cursor: pointer;

  :hover {
    background-color: #68C0FF;
  }

  :disabled {
    background-color: #c0c0c0;
    cursor: not-allowed;
  }
`;

export const SignupTextBox = styled.div`
  width: 400px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
  border-bottom: 1px solid ${borderColor2};

  h2, p {
    margin-bottom: 0;
  }
`;

export const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 400px;
`;

export const StepItem = styled.div<{ active?: boolean; completed?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  &:not(:last-child)::before {
    content: "";
    position: absolute;
    top: 25%;
    left: calc(50% + ${DOT_RADIUS}px); /* 현재 원의 중심에서 반지름만큼 오른쪽 */
    width: calc(100% - ${DOT_RADIUS * 2}px); /* 다음 원 중심까지 길이 맞춤 */
    height: 2px;
    background-color: ${({ completed }) => (completed ? buttonColor : borderColor1)};
    transform: translateY(-50%);
  }
`;

export const StepCircle = styled.div<{ active?: boolean; completed?: boolean }>`
  width: ${DOT_SIZE}px;
  height: ${DOT_SIZE}px;
  border-radius: 50%;
  background-color: ${({ active, completed }) => (active || completed ? buttonColor : borderColor1)};
`;


export const StepLabel = styled.span<{ active?: boolean }>`
  margin-top: 6px;
  font-size: 14px;
  font-weight: ${({ active }) => (active ? "500" : "400")};
  color: ${({ active }) => (active ? textColor : borderColor2)};
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export const AuthInputRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
`;

export const ChangeButton = styled.button<{ isFull: boolean }>`
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 700;
  border: none;
  border-radius: 5px;
  margin-bottom: 35px;
  color: white;

  ${({ isFull }) =>
    isFull ? 
    `
      background-color: ${buttonColor};
      &:hover {
        background-color: ${buttonHoverColor};
      }
      cursor: pointer;
    ` : `
      background-color: #AEAEAE
    `
  }
`

export const PasswordInputContainer = styled.div`
  width: 100%;
`;

export const InputGap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
