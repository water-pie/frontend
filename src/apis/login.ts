import { api } from "./instance";

export const loginApi = async (data: {
  email: string;
  password: string;
}) => {
  try {
    return (await api.post("/auth/login", data)).data;
  } catch (e: any) {
    if (e.response && e.response.status === 401) {
      alert("이메일 또는 비밀번호가 일치하지 않습니다.");
    } else {
      alert("로그인 중 오류가 발생했습니다.");
    }
    return null;
  }
};
