import styled from "@emotion/styled";
import { borderColor1, borderColor2, buttonColor, buttonHoverColor, textColor } from "../common";

export const Wrapper = styled.div`
  width: 1180px;
  margin: 40px auto;
  display: flex;
  gap: 60px;
`;

export const LeftPanel = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h2 {
    font-size: 28px;
    font-weight: bold;
    margin: 0;
  }
`;

export const RightPanel = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const StepIndicator = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
`;

export const StepItem = styled.div<{ active?: boolean; completed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StepCircle = styled.div<{ active?: boolean; completed?: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background-color: ${({ active, completed }) => (active || completed ? buttonColor : borderColor1)};
  color: ${({ active, completed }) => (active || completed ? "white" : textColor)};
`;

export const StepLabel = styled.span<{ active?: boolean }>`
  font-size: 16px;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  color: ${({ active }) => (active ? textColor : borderColor2)};
`;

export const FormSection = styled.div`
  margin-bottom: 20px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    color: ${borderColor2};
    margin: 0 0 10px 0;
  }
`;

export const DateGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  input {
    flex: 1;
  }

  span {
    font-size: 16px;
    min-width: 80px;
  }

  button {
    background-color: ${buttonColor};
    color: white;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;

    &:hover {
      background-color: ${buttonHoverColor};
    }
  }
`;

export const SummaryBox = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 10px;

  &.total {
    font-weight: bold;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid ${borderColor1};
  }
`;

export const PointInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  
  p {
    margin: 0;
    font-size: 16px;
  }

  button {
    background-color: ${buttonColor};
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: ${buttonHoverColor};
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: start;
  gap: 20px;
  margin-top: 40px;

  button {
    padding: 12px 40px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export const PrevButton = styled.button`
  background-color: white;
  border: 1px solid ${borderColor2};
  color: ${textColor};
`;

export const SubmitButton = styled.button`
  background-color: ${buttonColor};
  border: none;
  color: white;

  &:hover {
    background-color: ${buttonHoverColor};
  }
`;

export const FullWidthTextarea = styled.textarea`
  width: 100%;
  height: 80px;
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

export const Warning = styled.p`
  color: red !important;
  font-size: 12px !important;
`;

export const PurchaseWarning = styled.div`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
`;

export const RadioButton = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const TimeInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    flex: 1;
    height: 36px;
  }
`;

export const DateInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${borderColor1};
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
`;

export const ImageUploadArea = styled.div`
  width: 300px;
  height: 200px;
  background-color: ${borderColor1};
  border: 1px dashed ${borderColor2};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const ImageUploadButton = styled.button`
  background-color: ${buttonColor};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${buttonHoverColor};
  }
`;

export const PromotionTypeGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

export const PromotionTypeBox = styled.div<{ selected?: boolean }>`
  border: 1px solid ${({ selected }) => (selected ? buttonColor : borderColor1)};
  background-color: ${({ selected }) => (selected ? '#f0f8ff' : 'white')};
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  text-align: center;

  &:hover {
    border-color: ${buttonColor};
  }

  div { // Icon placeholder
    font-size: 32px;
    margin-bottom: 10px;
  }

  h4 {
    font-size: 16px;
    font-weight: bold;
    margin: 0 0 5px 0;
  }

  p {
    font-size: 13px;
    color: #666;
    margin: 0;
  }
`;

export const ChannelGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

export const ChannelBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid ${borderColor1};
  padding: 15px;
  border-radius: 8px;

  input[type="checkbox"] {
    margin-top: 3px;
  }

  label {
    cursor: pointer;
    font-weight: bold;
    font-size: 15px;
    p {
      font-size: 13px;
      font-weight: normal;
      color: #666;
      margin-top: 5px;
    }
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid ${borderColor1};
  font-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>') no-repeat;
  background-position: right 15px center;
  background-size: 20px;
`;

export const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

export const ImagePreviewItem = styled.div`
  position: relative;
  width: 150px;
  height: 100px;
  border: 1px solid ${borderColor1};
  border-radius: 5px;
  overflow: hidden;
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
`;
