import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import { borderColor2, textColor } from "../common"

export const ClassificationBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const Classification = styled(Link)<{ selected?: boolean }>`
  color: ${({ selected }) => selected ? textColor : borderColor2};
  font-weight: ${({ selected }) => selected ? "700" : "500"};
  font-size: 18px;
  cursor: pointer;
`

export const NoticeContainer = styled.div`
  width: 100%;
  max-width: 1180px;
  display: flex;
  justify-content: space-between;
  gap: 40px; /* gap 추가로 간격 확보 */
  box-sizing: border-box;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    padding: 0 15px;
  }
`

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  min-width: 200px; /* 최소 너비 확보 */
  flex-shrink: 0; /* 축소 방지 */
  
  h2 {
    white-space: nowrap; /* 줄넘김 방지 */
  }
  
  @media (max-width: 768px) {
    width: 100%;
    min-width: unset;
    
    h2 {
      white-space: normal; /* 모바일에서는 줄넘김 허용 */
    }
  }
`

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 20px;
  flex: 1; /* 남은 공간 차지 */
  min-width: 0; /* flex item이 부모를 넘지 않도록 */
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`

export const NoPostsMessage = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 18px;
  color: ${textColor};
`;