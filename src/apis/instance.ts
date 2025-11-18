import axios from "axios";

const API_BASE_URL = "https://rehelp.co.kr/api/";
const IMAGE_BASE_URL = "https://review-helper-image-bucket.s3.ap-northeast-2.amazonaws.com/";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

const prependImageBaseUrl = (data: any): any => {
  if (!data) return data;

  if (Array.isArray(data)) {
    return data.map(prependImageBaseUrl);
  }

  if (typeof data === "object") {
    return Object.keys(data).reduce((acc, key) => {
      if (key.toLowerCase().includes("image") || key.toLowerCase().includes("img")) {
        const value = data[key];
        if (typeof value === "string") {
          acc[key] = value.startsWith("http") ? value : `${IMAGE_BASE_URL}${value}`;
        } else if (Array.isArray(value)) {
          acc[key] = value.map((item) =>
            typeof item === "string" && !item.startsWith("http") ? `${IMAGE_BASE_URL}${item}` : item
          );
        } else {
          acc[key] = prependImageBaseUrl(value);
        }
      } else {
        acc[key] = prependImageBaseUrl(data[key]);
      }
      return acc;
    }, {} as any);
  }

  return data;
};

api.interceptors.response.use(
  (response) => {
    response.data = prependImageBaseUrl(response.data);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
