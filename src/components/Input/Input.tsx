import styled from "@emotion/styled";

interface Props {
  type?: string;
  name?: string;
  placeholder?: string;
  value?: any;
  disable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({
  type, name, placeholder, value, onChange, disable
}: Props) => {
  return (
    <InputField
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disable}
    />
  )
};

export const InputField = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 5px;
  border: 1px solid #888;
  font-size: 16px;
  padding-left: 10px;
  box-sizing: border-box;
  color: black;
  
  :focus {
    outline: none;
  }
`

export const SendInput = styled.input`
  width: 100%;
  height: 44px;
  border-radius: 5px;
  border: 1px solid #888;
  font-size: 16px;
  padding-left: 10px;
  
  :focus {
    outline: none;
  }
`

export default Input;