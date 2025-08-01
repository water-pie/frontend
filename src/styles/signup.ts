import styled from "@emotion/styled"
import { Link } from "react-router-dom"

export const Textarea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;

  h2 {
    margin-bottom: 0;
  }
`

export const SignupBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 60px;
`

export const SignupTypeBox = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 15px;
  width: 250px;
  height: 250px;
  box-shadow: 7px 7px 20px rgb(0 0 0 / 30%);
  transition: all 200ms;

  span {
    font-size: 20px;
    font-weight: 600;
  }

  :hover {
    scale: 1.05;
  }
`

export const ImgBox = styled.div<{color: string}>`
  border-radius: 100%;
  ${({ color }) => `border: 5px solid ${color};`}
  padding: 20px;
  display: flex;
  align-items: center;

  img {
    width: 80px;
  }
`