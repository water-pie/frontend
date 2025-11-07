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
  background-color: white;
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
    text-align: center;
    margin-bottom: 10px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .button-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  button {
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;

    &.primary {
      background-color: #007bff;
      color: white;

      &:hover {
        background-color: #0056b3;
      }
    }

    &.secondary {
      background-color: #6c757d;
      color: white;

      &:hover {
        background-color: #5a6268;
      }
    }
  }
`;
