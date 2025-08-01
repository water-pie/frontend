import styled from "@emotion/styled"
import { Link } from "react-router-dom"

export const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  border-bottom: 1px solid black;
`

export const FieldContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: end;

  span {
    font-size: 12px;
    cursor: pointer;
  }
`

export const AutoLogin = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
`

export const LoginButton = styled.button<{ isFull: boolean }>`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  margin-bottom: 35px;
  color: white;

  ${({ isFull }) =>
    isFull
      ? `
        background-color: #96d3ff;
        &:hover {
          background-color: #68C0FF;
        }
        cursor: pointer;
      `
      : `
        background-color: #AEAEAE;
      `}
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
  height: 50px;
  align-items: center;
  background-color: #96d3ff;
  font-size: 20px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;

  :hover {
    background-color: #68C0FF;
  }
`

export const Description = styled.div`
  width: 100%;
  justify-content: start;
  gap: 2px;
  h3 {
    font-size: 22px;
    margin-bottom: 0;
  }
  p {
    margin-top: 0;
  }
`