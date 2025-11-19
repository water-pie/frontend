import { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';

interface Props {
  currentLocation: string;
  onClose: () => void;
  onApply: (location: string) => void;
}

const LOCATION_DATA: { [key: string]: string[] } = {
  '서울': ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
  '경기': ['수원시', '성남시', '고양시', '용인시', '부천시', '안산시', '안양시', '남양주시', '화성시', '평택시', '의정부시', '시흥시', '파주시', '김포시', '광명시', '광주시', '군포시', '오산시', '이천시', '안성시', '하남시', '의왕시', '양주시', '동두천시', '과천시', '여주시', '포천시', '가평군', '양평군', '연천군'],
  '인천': ['계양구', '미추홀구', '남동구', '동구', '부평구', '서구', '연수구', '중구', '강화군', '옹진군'],
  '강원': ['춘천시', '원주시', '강릉시', '동해시', '태백시', '속초시', '삼척시', '홍천군', '횡성군', '영월군', '평창군', '정선군', '철원군', '화천군', '양구군', '인제군', '고성군', '양양군'],
  '대전': ['대덕구', '동구', '서구', '유성구', '중구'],
  '세종': [],
  '충남': ['천안시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', '당진시', '금산군', '부여군', '서천군', '청양군', '홍성군', '예산군', '태안군'],
  '충북': ['청주시', '충주시', '제천시', '보은군', '옥천군', '영동군', '증평군', '진천군', '괴산군', '음성군', '단양군'],
  '부산': ['강서구', '금정구', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구', '기장군'],
  '울산': ['남구', '동구', '북구', '중구', '울주군'],
  '경남': ['창원시', '김해시', '진주시', '양산시', '거제시', '통영시', '사천시', '밀양시', '함안군', '거창군', '창녕군', '고성군', '하동군', '남해군', '산청군', '함양군', '의령군'],
  '경북': ['포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시', '문경시', '경산시', '군위군', '의성군', '청송군', '영양군', '영덕군', '청도군', '고령군', '성주군', '칠곡군', '예천군', '봉화군', '울진군', '울릉군'],
  '대구': ['남구', '달서구', '동구', '북구', '서구', '수성구', '중구', '달성군'],
  '광주': ['광산구', '남구', '동구', '북구', '서구'],
  '전남': ['목포시', '여수시', '순천시', '나주시', '광양시', '담양군', '곡성군', '구례군', '고흥군', '보성군', '화순군', '장흥군', '강진군', '해남군', '영암군', '무안군', '함평군', '영광군', '장성군', '완도군', '진도군', '신안군'],
  '전북': ['전주시', '익산시', '군산시', '정읍시', '남원시', '김제시', '완주군', '진안군', '무주군', '장수군', '임실군', '순창군', '고창군', '부안군'],
  '제주': ['제주시', '서귀포시'],
};

const regions = Object.keys(LOCATION_DATA);

export const LocationFilter = ({ currentLocation, onClose, onApply }: Props) => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const backgroundRef = useRef(null);

  useEffect(() => {
    if (currentLocation) {
      const [region, district] = currentLocation.split(' ');
      if (regions.includes(region)) {
        setSelectedRegion(region);
        if (district && LOCATION_DATA[region]?.includes(district)) {
          setSelectedDistrict(district);
        } else {
          setSelectedDistrict('');
        }
      }
    } else {
      setSelectedRegion('서울'); // Default value
      setSelectedDistrict('');
    }
  }, [currentLocation]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (backgroundRef.current) {
      e.target === backgroundRef.current && onClose();
    }
  };

  const handleApply = () => {
    let location = selectedRegion;
    onApply(location);
    if (selectedDistrict) {
      location += ` ${selectedDistrict}`;
      onApply(selectedDistrict);
    }
    onClose();
  };

  const districts = LOCATION_DATA[selectedRegion] || [];

  return (
    <ModalOverlay ref={backgroundRef} onClick={handleClick}>
      <ModalContent>
        <Header>
            <SelectedRegion>
              {selectedRegion} {selectedDistrict && `> ${selectedDistrict}`}
            </SelectedRegion>
            <CloseIcon
              onClick={onClose}
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

        {districts.length > 0 && (
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
        <Footer>
          <ApplyButton onClick={handleApply}>적용하기</ApplyButton>
        </Footer>
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

const Footer = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #f0f0f0;
`;

const ApplyButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: #96d3ff;
  color: #fff;
  font-weight: bold;
  font-size: 15px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #7abaff;
  }
`;