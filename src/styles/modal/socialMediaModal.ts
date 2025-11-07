import styled from '@emotion/styled';
import { borderColor1, textColor, buttonColor, buttonHoverColor } from '../common';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${borderColor1};
  padding-bottom: 15px;
  margin-bottom: 20px;
`;

export const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: ${textColor};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${textColor};
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid ${borderColor1};
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;
  }
`;

export const Label = styled.span`
  font-size: 14px;
  color: ${textColor};
  margin-bottom: 5px;
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
  align-self: center;
  margin-top: 20px;

  &:hover {
    background-color: ${buttonHoverColor};
  }
`;
