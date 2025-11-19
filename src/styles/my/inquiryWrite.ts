import styled from '@emotion/styled';
import { borderColor1, textColor, buttonColor, buttonHoverColor } from '../common';

export const InquiryWriteContainer = styled.div`
  width: 100%; // Fixed width
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${borderColor1};

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid ${borderColor1};
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;

    @media (max-width: 768px) {
      font-size: 14px;
      padding: 8px;
    }
  }
`;

export const MarkdownEditorContainer = styled.div`
  border: 1px solid ${borderColor1};
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const Toolbar = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid ${borderColor1};
  background-color: #f9f9f9;
  gap: 5px;

  @media (max-width: 768px) {
    padding: 8px;
    gap: 3px;
    flex-wrap: wrap;
  }
`;

export const ToolbarButton = styled.button`
  background: none;
  border: 1px solid ${borderColor1};
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  color: ${textColor};

  &:hover {
    background-color: ${borderColor1};
  }

  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 12px;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: 15px;
  border: none;
  resize: vertical;
  font-size: 16px;
  line-height: 1.5;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    min-height: 200px;
    font-size: 14px;
    padding: 10px;
  }
`;

export const MarkdownPreview = styled.div`
  padding: 15px;
  border-top: 1px solid ${borderColor1};
  background-color: #fff;
  min-height: 100px;
  // Apply markdown styles here or import from markdown.ts
`;

export const SubmitButton = styled.button`
  background-color: ${buttonColor};
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  width: 150px; // Fixed width for the button
  align-self: flex-end; // Align to the right

  &:hover {
    background-color: ${buttonHoverColor};
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 15px;
    font-size: 16px;
    align-self: center;
  }
`;
