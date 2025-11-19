import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import { borderColor2, buttonColor, buttonHoverColor, textColor } from "./common"

export const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  border-bottom: 1px solid ${textColor};
  gap: 10px;

  h2 {
    padding-bottom: 30px;
  }
`

export const FieldContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Detail = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 1px;
  margin: 10px 0;
`

export const Pw = styled.div`
  display: flex;
  width: 100%;
  font-size: 16px;
  justify-content: end;
`

export const AutoLogin = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
  margin-top: 20px;
`

export const SubTab = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const FindPw = styled.span`
  cursor: pointer;
  :hover {
    font-weight: 600;
  }
`

export const LoginButton = styled.button<{ isFull: boolean }>`
  width: 100%;
  height: 48px;
  font-size: 20px;
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

export const Signup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
`

export const SignupButton = styled(Link)`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 48px;
  align-items: center;
  background-color: ${buttonColor};
  font-size: 20px;
  font-weight: 700;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin-top: 20px;

  :hover {
    background-color: ${buttonHoverColor};
  }
`

export const Description = styled.div`
  width: 100%;
  justify-content: start;
  gap: 2px;
  margin-bottom: 10px;

  h3 {
    font-size: 20px;
    margin-top: 40px;
  }
  p {
    font-size: 14px;
    margin-top: 0;
    color: ${borderColor2};
  }
`