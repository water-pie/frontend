import Input from "components/Input/Input";
import type { URLFormState } from "types/input";

interface Props {
  form: URLFormState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFields = [
  { name: 'youtube', placeholder: '유튜브 URL을 입력해주세요.' },
  { name: 'blog', placeholder: '블로그 URL을 재입력해주세요.' },
  { name: 'insta', placeholder: '인스타그램 URL을 입력해주세요.' },
  { name: 'tiktok', placeholder: '틱톡 URL을 입력해주세요.' },
];

export const Platform = ({ form, handleChange }: Props) => {
  return (
    <>
      {InputFields.map((field) => {
        return (
          <Input
            key={field.name}
            name={field.name}
            type="text"
            placeholder={field.placeholder}
            value={form[field.name as keyof typeof form]}
            onChange={handleChange}
          />
        )
      })}
    </>
  )
}