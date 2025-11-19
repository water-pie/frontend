import styled from '@emotion/styled';
import { buttonColor, buttonHoverColor, borderColor1, textColor } from '../common';

export const ProfileEditContainer = styled.div`
  width: 100%;
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

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`;

export const FormGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;

  & > input, & > div {
    flex-grow: 1;
    box-sizing: border-box; // Added this
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: ${textColor};
  min-width: 120px;

  @media (max-width: 768px) {
    min-width: unset;
    width: 100%;
    font-size: 14px;
  }
`;

export const PasswordInputWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  width: 100%; // Ensure it takes full width in mobile view

  input {
    padding-right: 40px; // Make space for the toggle button
    width: 100%; // Ensure input fills its wrapper
    box-sizing: border-box; // Added this
  }
`;

export const PasswordToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: ${textColor};
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

  &:hover {
    background-color: ${buttonHoverColor};
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 15px;
    font-size: 16px;
  }
`;
