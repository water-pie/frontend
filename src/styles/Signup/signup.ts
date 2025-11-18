import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import { borderColor2, buttonColor, buttonHoverColor } from "../common"

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

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
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
  padding: 20px 20px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 40px;
  box-sizing: border-box;
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

export const SignupField = styled.div`
  margin-top: 50px;
  width: 100%; /* Changed from 400px */
  max-width: 400px; /* Added max-width */
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 20px; /* Add horizontal padding */
  box-sizing: border-box; /* Ensure padding is included in width */

  h3 {
    margin-bottom: 0;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`

export const SignupButton = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40px;
  align-items: center;
  background-color: ${buttonColor};
  font-size: 16px;
  font-weight: 700;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  :hover {
    background-color: ${buttonHoverColor};
  }
`