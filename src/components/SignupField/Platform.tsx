import Input from "components/Input/Input";
import { useState } from "react";
import type { URLFormState } from "types/input";

const InputFields = [
  { name: 'youtube', placeholder: '유튜브 URL을 입력해주세요.' },
  { name: 'blog', placeholder: '블로그 URL을 재입력해주세요.' },
  { name: 'insta', placeholder: '인스타그램 URL을 입력해주세요.' },
  { name: 'tiktok', placeholder: '틱톡 URL을 입력해주세요.' },
];

export const Platform = () => {
  const [form, setForm] = useState<URLFormState>({
    youtube: "",
    blog: "",
    insta: "",
    tiktok: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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