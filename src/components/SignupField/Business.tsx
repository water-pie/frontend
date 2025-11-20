import { Input, SendInput } from "../Input/Input";
import { useState } from "react";
import styled from "@emotion/styled";
import DaumPostModal from "components/Modal/DaumPostModal";

interface Props {
  form: {
    registrationNumber: string;
    address: string;
    detailedAddress: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setForm: React.Dispatch<React.SetStateAction<any>>; // Use a more specific type if available
}

export const Business = ({ form, handleChange, setForm }: Props) => {
  const [popup, setPopup] = useState(false);

    const handleAddressSelect = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    setForm({ address: fullAddress });
    setPopup(false);
  }

  return (
    <>
      <Input
        type="text"
        name="registrationNumber"
        placeholder="사업자 등록증 번호를 입력해주세요."
        maxLength={12}
        value={form.registrationNumber}
        onChange={handleChange}
      />
      <InputContanier>
        <SendInput
          type="text"
          name="address"
          placeholder="주소를 입력하세요."
          value={form.address}
          disabled={true}
        />
        <SearchButton onClick={() => setPopup(true)}>찾기</SearchButton>
      </InputContanier>
      <Input
        type="text"
        name="detailedAddress"
        placeholder="상세 주소를 입력해주세요."
        value={form.detailedAddress}
        onChange={handleChange}
      />
      {popup && <DaumPostModal onComplete={handleAddressSelect} onClose={() => setPopup(false)}/>}
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
  white-space: nowrap;
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
