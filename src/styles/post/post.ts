import styled from "@emotion/styled"
import { Link } from "react-router-dom"

export const NoticeContainer = styled.div`
  width: 1180px;
  display: flex;
  justify-content: space-between;
`

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
`

export const ClassificationBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const Classification = styled(Link)<{ selected?: boolean }>`
  color: ${({ selected }) => selected ? "#272727" : "#888888"};
  font-weight: ${({ selected }) => selected ? "700" : "500"};
  font-size: 18px;
  cursor: pointer;
`

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 20px;
`