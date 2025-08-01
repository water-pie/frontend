import { Input } from "../Input/Input";
import { useState } from "react";
import styled from "@emotion/styled";

const Business = () => {
  const [businessInfo, setBusinessInfo] = useState({
    registrationNumber: "",
    address: "",
    detailedAddress: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessInfo({
      ...businessInfo,
      [name]: value,
    });
  };

  return (
    <BusinessContainer>
      <Title>사업자 등록증</Title>
      <InputWrapper>
        <Input
          type="text"
          name="registrationNumber"
          placeholder="사업자 등록증 번호를 입력해주세요."
          value={businessInfo.registrationNumber}
          onChange={handleChange}
        />
      </InputWrapper>
      <AddressWrapper>
        <FlexInputWrapper>
            <Input
              type="text"
              name="address"
              placeholder="주소를 입력하세요"
              value={businessInfo.address}
              onChange={handleChange}
            />
        </FlexInputWrapper>
        <SearchButton>찾기</SearchButton>
      </AddressWrapper>
      <InputWrapper>
        <Input
          type="text"
          name="detailedAddress"
          placeholder="상세 주소를 입력해주세요."
          value={businessInfo.detailedAddress}
          onChange={handleChange}
        />
      </InputWrapper>
    </BusinessContainer>
  );
};

export default Business;

const BusinessContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 400px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 20px 0;
`;

const InputWrapper = styled.div`
    input {
        width: 100%;
        box-sizing: border-box;
    }
`;

const FlexInputWrapper = styled(InputWrapper)`
    flex-grow: 1;
`;

const AddressWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const SearchButton = styled.button`
  width: 80px;
  height: 44px;
  border-radius: 10px;
  border: 1.5px solid #646464;
  background-color: #d9d9d9;
  font-size: 16px;
  cursor: pointer;
  flex-shrink: 0;
`;
