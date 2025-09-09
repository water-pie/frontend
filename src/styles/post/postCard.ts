import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import { borderColor2, textColor } from "../common"

export const Container = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  padding: 15px 40px;
  border: 1px solid ${borderColor2};
`

export const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${textColor};
`

export const Info = styled.div`
  display: flex;
  gap: 50px;
`

export const Created = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${borderColor2};
`

export const Watch = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${borderColor2};
`