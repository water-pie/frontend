import styled from "@emotion/styled";

interface Props {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({
  type, name, placeholder, value, onChange
}: Props) => {
  return (
    <InputField
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
};

export const InputField = styled.input`
  height: 40px;
  border-radius: 10px;
  border: 1.5px solid #646464;
  font-size: 16px;
  padding-left: 10px;
  
  :focus {
    outline: none;
  }
`

export const SendInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: 1.5px solid #646464;
  font-size: 16px;
  padding-left: 10px;
  
  :focus {
    outline: none;
  }
`

export default Input;