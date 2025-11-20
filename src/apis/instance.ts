import axios from "axios";
import useUserStore from "store/useUserStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

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

api.interceptors.request.use(
  (config) => {
    const userInfo = useUserStore.getState().userInfo;
    if (userInfo && userInfo.token) {
      config.headers["Authorization"] = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => {return Promise.reject(error)}
);

api.interceptors.response.use(
  (response) => {
    response.data = prependImageBaseUrl(response.data);
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      useUserStore.getState().logout();
    }
    return Promise.reject(error);
  }
);