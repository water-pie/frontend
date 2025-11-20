import styled from "@emotion/styled";
import { Input } from "components/Input/Input";
import { buttonColor, buttonHoverColor, borderColor1, borderColor2 } from "../common";

export const Wrapper = styled.div`
  width: 1180px;
  margin: 0 auto 3rem auto; /* Center the wrapper */
  padding-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  border-bottom: 1px solid ${borderColor1};

  @media (max-width: 1200px) {
    width: 95%; /* Adjust width for smaller desktops/large tablets */
    padding: 0 1rem 3rem 1rem; /* Add horizontal padding */
  }

  @media (max-width: 768px) {
    flex-direction: column; /* Stack content vertically */
    width: 100%;
    gap: 1.5rem;
    padding: 0 1rem 2rem 1rem;
    margin-bottom: 2rem;
  }
`;

export const LeftContent = styled.div`
  flex: 1;
  max-width: 700px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    max-width: 100%; /* Take full width */
    padding: 0 1rem; /* Add horizontal padding */
  }
`;

export const RightContent = styled.div`
  width: 350px;

  @media (max-width: 768px) {
    width: 100%; /* Take full width */
    padding: 0 1rem; /* Add horizontal padding */
  }
`;

export const StickyCard = styled.div`
  position: sticky;
  top: 2rem;
  border-radius: 8px;
  background-color: white;
  padding: 1.5rem; /* Add padding to the card itself */
  box-shadow: 0 0 10px rgba(0,0,0,0.05); /* Add subtle shadow */

  @media (max-width: 768px) {
    position: static; /* Remove sticky positioning on smaller screens */
    top: auto;
    margin-top: 1.5rem; /* Add some top margin when not sticky */
  }

  @media (max-width: 480px) {
    padding: 1rem; /* Smaller padding on very small screens */
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 1.5rem;
  }
  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 1rem;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  gap: 1rem;
  border-bottom: 1px solid ${borderColor1}; /* Add border to sections */

  &:last-of-type {
    border-bottom: none; /* No border for the last section */
    margin-bottom: 0;
    padding-bottom: 0;
  }

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

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    gap: 0.8rem;
    h2 {
      font-size: 18px;
    }
    p {
      font-size: 13px;
    }
  }
  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    gap: 0.6rem;
    h2 {
      font-size: 16px;
    }
    p {
      font-size: 12px;
    }
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

  @media (max-width: 480px) {
    height: 100px;
    font-size: 14px;
    padding: 8px;
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

export const AddressBox = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;

    input {
      width: 100%; /* Ensure input takes full width */
    }
  }
`

export const SearchButton = styled.button`
  word-break: keep-all;
  white-space: nowrap;
  font-size: 18px;
  font-weight: 600;
  background-color: #96d3ff;
  color: white;
  border-radius: 10px;
  border: none;
  padding: 0px 20px;
  cursor: pointer;

  :hover {
    background-color: #68C0FF;
  }

  @media (max-width: 480px) {
    width: 100%; /* Full width button on very small screens */
    font-size: 16px;
    padding: 10px 0; /* Adjust padding */
  }
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

  @media (max-width: 768px) {
    padding: 1.2rem;
    h3 {
      font-size: 15px;
    }
    p {
      font-size: 13px;
    }
    a {
      font-size: 13px;
    }
  }
  @media (max-width: 480px) {
    padding: 1rem;
    h3 {
      font-size: 14px;
    }
    p {
      font-size: 12px;
    }
    a {
      font-size: 12px;
    }
  }
`;

export const ImageNotice = styled.img`
  width: 100%;
  margin-top: 1rem;
  height: auto; /* Ensure image scales proportionally */
`;

// For the right sticky card
export const CafeImage = styled.img`
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 1rem;
  height: 180px; /* Fixed height for consistency */

  @media (max-width: 480px) {
    height: 150px; /* Smaller height on very small screens */
    margin-bottom: 0.8rem;
  }
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

  @media (max-width: 480px) {
    font-size: 14px;
    img {
      width: 20px;
      height: 20px;
    }
  }
`;

export const CampaignTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 0.5rem 0;

  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 0.4rem;
  }
`;

export const CampaignDescription = styled.p`
  font-size: 14px;
  color: ${borderColor2};
  margin: 0 0 1rem 0;

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 0.8rem;
  }
`;

export const Point = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid ${borderColor2};

  @media (max-width: 480px) {
    font-size: 15px;
    padding: 0.4rem;
    margin-bottom: 0.8rem;
  }
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

  @media (max-width: 480px) {
    gap: 0.8rem;
    margin-top: 1rem;
    padding-top: 1rem;
    label {
      font-size: 13px;
    }
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

  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 0.9rem;
    margin-top: 1rem;
  }
`;