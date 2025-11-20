import styled from "@emotion/styled";
import DaumPostcode from "react-daum-postcode";

const DaumPostBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9998;
`;

const DaumPostContainer = styled.div`
  width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #212529;
`;

const CancelButton = styled.button`
  width: 32px;
  height: 32px;
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  color: #495057;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #f8f9fa;
    border-color: #adb5bd;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const PostcodeWrapper = styled.div`
  height: 400px;
`;

interface DaumPostProps {
  onClose: () => void;
  onComplete: (data: any) => void;
}

export default function DaumPostModal({ onClose, onComplete }: DaumPostProps) {
  return (
    <DaumPostBackground onClick={onClose}>
      <DaumPostContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>주소 검색</Title>
          <CancelButton onClick={onClose}>✕</CancelButton>
        </Header>
        <PostcodeWrapper>
          <DaumPostcode onComplete={onComplete} style={{ height: "100%" }} />
        </PostcodeWrapper>
      </DaumPostContainer>
    </DaumPostBackground>
  );
}