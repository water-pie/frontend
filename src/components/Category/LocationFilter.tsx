import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';

interface Props {
  onClose: () => void;
}

export const LocationFilter = ({ onClose }: Props) => {
  const [selectedRegion, setSelectedRegion] = useState('대전');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const backgroundRef = useRef(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (backgroundRef.current) {
      e.target === backgroundRef.current && onClose();
    }
  };

  const regions = [
    '서울', '경기', '인천', '강원', '대전', '세종',
    '충남', '충북', '부산', '울산', '경남',
    '경북', '대구', '광주', '전남', '전북', '제주',
  ];

  const districts = ['대덕구', '동구', '서구', '유성구', '중구'];

  return (
    <ModalOverlay ref={backgroundRef} onClick={handleClick}>
      <ModalContent>
        <Header>
            <SelectedRegion>
              {selectedRegion} {selectedDistrict && `> ${selectedDistrict}`}
            </SelectedRegion>
            <CloseIcon
              onClick={() => {
                setSelectedRegion('');
                setSelectedDistrict('');
                onClose();
              }}
            >
              ×
            </CloseIcon>
        </Header>

        <ButtonGrid>
          {regions.map((region) => (
            <RegionButton
              key={region}
              selected={selectedRegion === region}
              onClick={() => {
                setSelectedRegion(region);
                setSelectedDistrict('');
              }}
            >
              {region}
            </RegionButton>
          ))}
        </ButtonGrid>

        {selectedRegion === '대전' && (
          <ButtonGrid borderNone>
            {districts.map((district) => (
              <DistrictButton
                key={district}
                selected={selectedDistrict === district}
                onClick={() => setSelectedDistrict(district)}
              >
                {district}
              </DistrictButton>
            ))}
          </ButtonGrid>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default LocationFilter;

const ModalOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20px;
  z-index: 50;
`;

const ModalContent = styled.div`
  background: #fff;
  width: 900px;
  padding: 0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Header = styled.div`
  padding: 16px 20px 10px 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
  padding-bottom: 10px;
`;

const SelectedRegion = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const CloseIcon = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #888;
  cursor: pointer;
`;

const ButtonGrid = styled.div<{ borderNone?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
  border-bottom: ${({ borderNone }) => (borderNone ? 'none' : '1px solid #f0f0f0')};
`;

const RegionButton = styled.button<{ selected: boolean }>`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#96d3ff' : '#f1f1f1')};
  color: ${({ selected }) => (selected ? '#fff' : '#333')};
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  font-size: 15px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ selected }) => (selected ? '#7abaff' : '#ddd')};
  }
`;

const DistrictButton = styled(RegionButton)`
  background-color: ${({ selected }) => (selected ? '#96d3ff' : '#f1f1f1')};
  color: ${({ selected }) => (selected ? '#fff' : '#333')};

  &:hover {
    background-color: ${({ selected }) => (selected ? '#7abaff' : '#ddd')};
  }
`;
