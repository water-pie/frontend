import { api } from "./instance";

export const generateLicenseCodeApi = async (email: string) => {
  try {
    const response = await api.post(`/licence-code/generate/${email}`);
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const verifyLicenseCodeApi = async (email: string, code: string) => {
  try {
    const response = await api.post(`/licence-code/validate`, 
      {
        email: email,
        code: code
      }
    );
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};