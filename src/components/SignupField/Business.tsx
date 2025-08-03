import { Input, SendInput } from "../Input/Input";
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
    <>
      <Input
        type="text"
        name="registrationNumber"
        placeholder="사업자 등록증 번호를 입력해주세요."
        value={businessInfo.registrationNumber}
        onChange={handleChange}
      />
      <InputContanier>
        <SendInput
          type="text"
          name="address"
          placeholder="주소를 입력하세요."
          value={businessInfo.address}
          onChange={handleChange}
        />
        <SearchButton>찾기</SearchButton>
      </InputContanier>
      <Input
        type="text"
        name="detailedAddress"
        placeholder="상세 주소를 입력해주세요."
        value={businessInfo.detailedAddress}
        onChange={handleChange}
      />
    </>
  );
};

export default Business;


const InputContanier = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;

export const SearchButton = styled.button`
  word-break: keep-all;
  font-size: 18px;
  font-weight: 600;
  background-color: #96d3ff;
  color: white;
  border-radius: 10px;
  border: none;
  padding: 0px 20px;
  cursor: pointer;

  :hover {
    background-color: #68C0FF;
  }
`
