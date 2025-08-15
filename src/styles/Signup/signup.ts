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

export const SignupTerms = styled.div`
  margin-top: 40px;
  padding: 20px 0px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`

export const TermsBox = styled.div`
  display: flex;
  gap: 8px;

  span {
    font-size: 14px;
    font-weight: 400;
  }
`

export const SignupTextBox = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  border-bottom: 1px solid #888888;

  h2, p {
    margin-bottom: 0;
  }
`;

export const SignupField = styled.div`
  margin-top: 50px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  h3 {
    margin-bottom: 0;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 200px;
`

export const SignupButton = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40px;
  align-items: center;
  background-color: #96d3ff;
  font-size: 16px;
  font-weight: 700;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  :hover {
    background-color: #68C0FF;
  }
`