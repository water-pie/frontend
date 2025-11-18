import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Input from "components/Input/Input";
import type { URLFormState } from "types/input";

interface Props {
  form: URLFormState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isOptional?: boolean;
}

const InputFields = [
  { name: 'youtube', placeholder: '유튜브 URL을 입력해주세요.' },
  { name: 'blog', placeholder: '블로그 URL을 입력해주세요.' },
  { name: 'insta', placeholder: '인스타그램 URL을 입력해주세요.' },
  { name: 'tiktok', placeholder: '틱톡 URL을 입력해주세요.' },
];

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin: 4px 0 0 4px;
  width: 100%;
  text-align: left;
`;

const OptionalLabel = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
  width: 100%;
  text-align: left;
`;

export const Platform = ({ form, handleChange, isOptional }: Props) => {
  const [errors, setErrors] = useState({ youtube: '', blog: '', insta: '', tiktok: '' });

  useEffect(() => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    const blogRegex = /^(https?:\/\/)?(blog\.naver\.com)\/.+$/; // Assuming only Naver blogs
    const instaRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/.+$/;
    const tiktokRegex = /^(https?:\/\/)?(www\.)?tiktok\.com\/.+$/;
    
    const newErrors = { youtube: '', blog: '', insta: '', tiktok: '' };

    if (form.youtube && !youtubeRegex.test(form.youtube)) {
      newErrors.youtube = '올바른 유튜브 URL 형식이 아닙니다.';
    }
    if (form.blog && !blogRegex.test(form.blog)) {
      newErrors.blog = '올바른 블로그 URL 형식이 아닙니다. (예: blog.naver.com)';
    }
    if (form.insta && !instaRegex.test(form.insta)) {
      newErrors.insta = '올바른 인스타그램 URL 형식이 아닙니다.';
    }
    if (form.tiktok && !tiktokRegex.test(form.tiktok)) {
      newErrors.tiktok = '올바른 틱톡 URL 형식이 아닙니다.';
    }
    
    setErrors(newErrors);
  }, [form]);

  return (
    <>
      {isOptional && <OptionalLabel>플랫폼 등록은 선택사항입니다.</OptionalLabel>}
      {InputFields.map((field) => {
        const fieldName = field.name as keyof typeof form;
        return (
          <div key={field.name} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Input
              name={fieldName}
              type="text"
              placeholder={field.placeholder}
              value={form[fieldName]}
              onChange={handleChange}
            />
            {errors[fieldName] && <ErrorMessage>{errors[fieldName]}</ErrorMessage>}
          </div>
        )
      })}
    </>
  )
}