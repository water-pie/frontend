import styled from "@emotion/styled";
import { Input } from "components/Input/Input";
import { buttonColor, buttonHoverColor, borderColor1, borderColor2 } from "../common";

export const Wrapper = styled.div`
  width: 1180px;
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  border-bottom: 1px solid ${borderColor1};
`;

export const LeftContent = styled.div`
  flex: 1;
  max-width: 700px;
  display: flex;
  flex-direction: column;
`;

export const RightContent = styled.div`
  width: 350px;
`;

export const StickyCard = styled.div`
  position: sticky;
  top: 2rem;
  border-radius: 8px;
  background-color: white;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 2rem;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  gap: 1rem;

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    min-width: 200px;
  }

  p {
    font-size: 14px;
    color: ${borderColor2};
    margin: 0;
  }
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  height: 120px;
  border-radius: 5px;
  border: 1px solid #888;
  font-size: 16px;
  padding: 10px;
  resize: vertical;
  box-sizing: border-box;

  :focus {
    outline: none;
  }
`;

export const AddressInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FullWidthInput = styled(Input)`
  width: 100%;
`

export const NoticeBox = styled.div`
  background-color: #f8f8f8;
  border: 1px solid ${borderColor1};
  padding: 1.5rem;
  border-radius: 8px;

  h3 {
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    color: #d9534f;
  }

  p {
    font-size: 14px;
    line-height: 1.6;
  }

  a {
    display: block;
    margin-top: 1rem;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    text-align: right;
  }
`;

export const ImageNotice = styled.img`
  width: 100%;
  margin-top: 1rem;
`;

export const SubmitButton = styled.button`
  width: 200px;
  padding: 1rem;
  margin-top: 1rem;
  background: ${buttonColor};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;
  align-self: center;

  &:hover {
    background-color: ${buttonHoverColor};
  }
`;

// For the right sticky card
export const CafeImage = styled.img`
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

export const DetailRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.5rem;
  font-size: 15px;

  img {
    width: 22px;
    height: 22px;
    margin-right: 4px;
  }

  span {
    font-weight: 500;
  }
`;

export const CampaignTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

export const CampaignDescription = styled.p`
  font-size: 14px;
  color: ${borderColor2};
  margin: 0 0 1rem 0;
`;

export const Point = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid ${borderColor2};
`;

export const CheckboxSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${borderColor1};

  label {
    font-size: 14px;
    line-height: 1.5;
  }
`;

export const RightCheckboxWrapper = styled.div`
  display: flex;
  align-items: start;
  gap: 0.5rem;

  input[type="checkbox"] {
    margin-top: 4px;
  }
`;

export const ApplyButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 1.5rem;
  background: ${buttonColor};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${buttonHoverColor};
  }
`;