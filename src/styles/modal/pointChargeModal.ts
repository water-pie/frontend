import styled from '@emotion/styled';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  color: black;
  padding: 30px;
  border-radius: 10px;
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: left;
    margin-bottom: 10px;
    border-bottom: 1px solid #555;
    padding-bottom: 15px;
  }

  input {
    background-color: #fff;
    border: 1px solid #888;
    color: black;
    padding: 15px 0px;
    border-radius: 5px;
    width: 100%;
    font-size: 1rem;
    text-indent: 10px;
    &::placeholder {
      color: #888;
    }
  }

  .point-buttons {
    display: flex;
    gap: 10px;
  }

  .point-button {
    flex: 1;
    background-color: #fff;
    border: 1px solid #555;
    color: black;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  .submit-button {
    background-color: #007bff;
    color: white;
    padding: 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: bold;
    &:hover {
      background-color: #0261c7ff;
    }
  }
`;
