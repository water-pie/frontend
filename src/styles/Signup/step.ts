import styled from "@emotion/styled";

const DOT_SIZE = 20; // StepCircle 크기(px)
const DOT_RADIUS = DOT_SIZE / 2;

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
    background-color: ${({ completed }) => (completed ? "#96d3ff" : "#f0f0f0")};
    transform: translateY(-50%);
    z-index: 0;
  }
`;

export const StepCircle = styled.div<{ active?: boolean; completed?: boolean }>`
  width: ${DOT_SIZE}px;
  height: ${DOT_SIZE}px;
  border-radius: 50%;
  background-color: ${({ active, completed }) => (active || completed ? "#96d3ff" : "#f0f0f0")};
  z-index: 1;
`;


export const StepLabel = styled.span<{ active?: boolean }>`
  margin-top: 6px;
  font-size: 14px;
  font-weight: ${({ active }) => (active ? "500" : "400")};
  color: ${({ active }) => (active ? "#272727" : "#888")};
`;
