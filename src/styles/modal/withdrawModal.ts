import styled from "@emotion/styled";
import { buttonColor, textColor, borderColor1, borderColor2 } from "styles/common";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  width: 440px;
  max-width: 90%;
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  
  @media (max-width: 480px) {
    padding: 24px;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${textColor};
  margin: 0 0 24px 0;
  text-align: center;
`;

export const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${textColor};
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const AmountBox = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${buttonColor};
  margin: 8px 0 16px;
  padding: 16px;
  background: #f8fcff;
  border-radius: 8px;
  text-align: center;
  border: 2px solid ${buttonColor};
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  
  button {
    flex: 1;
    padding: 10px 0;
    border: 1px solid ${buttonColor};
    background: white;
    color: ${buttonColor};
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background: ${buttonColor};
      color: white;
    }
    
    &:active {
      transform: scale(0.98);
    }
  }
  
  @media (max-width: 480px) {
    button {
      font-size: 13px;
      padding: 8px 0;
    }
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: 1px solid ${borderColor2};
  font-size: 16px;
  padding: 0 14px;
  box-sizing: border-box;
  color: ${textColor};
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${buttonColor};
  }
  
  &::placeholder {
    color: #999;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    height: 44px;
  }
`;

export const ModalActions = styled.div`
  margin-top: 28px;
  display: flex;
  gap: 12px;
  
  button {
    flex: 1;
    height: 48px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    
    &:first-of-type {
      background: white;
      color: ${textColor};
      border: 1px solid ${borderColor2};
      
      &:hover {
        background: ${borderColor1};
      }
    }
    
    &:last-child {
      background: ${textColor};
      color: white;
      
      &:hover:not(:disabled) {
        background: #000;
      }
      
      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }
    
    &:active:not(:disabled) {
      transform: scale(0.98);
    }
  }
  
  @media (max-width: 480px) {
    button {
      height: 44px;
      font-size: 15px;
    }
  }
`;

export const Warning = styled.div`
  margin-top: 16px;
  font-size: 13px;
  color: #ff6b6b;
  text-align: center;
  font-weight: 500;
`;