import { api } from "./instance";

export const loginApi = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};
