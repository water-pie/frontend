import styled from "@emotion/styled";

interface Props {
  type?: string;
  name?: string;
  placeholder?: string;
  value?: any;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
};

export const Input = ({
  type, name, placeholder, value, onChange, disabled, maxLength
}: Props) => {
  return (
    <InputField
      type={type}
      name={name}
      placeholder={placeholder}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  )
};

export const InputField = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 5px;
  border: 1px solid #888;
  font-size: 16px;
  padding: 0 10px;
  box-sizing: border-box;
  color: black;
  
  :focus {
    outline: none;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    height: 44px;
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

  @media (max-width: 480px) {
    font-size: 14px;
    height: 40px;
  }
`

export default Input;