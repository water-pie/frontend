
import { api } from "./instance";

// Influencer
export const signupAsInfluencer = async (data: {
  email: string;
  name: string;
  phoneNumber: string;
  youtubeUrl?: string;
  blogUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}) => {
  try {
    const response = await api.post("/users/signup/influencer", data);
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// Brand Manager
export const signupAsBrandManager = async (data: {
  email: string;
  name: string;
  phoneNumber: string;
  youtubeUrl?: string;
  blogUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  businessRegistrationNumber: string;
  address: string;
  detailedAddress: string;
}) => {
  try {
    const response = await api.post("/users/signup/brand-manager", data);
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// Marketing Agency
export const signupAsMarketingAgency = async (data: {
  email: string;
  name: string;
  phoneNumber: string;
  businessRegistrationNumber: string;
  address: string;
  detailedAddress: string;
}) => {
  try {
    const response = await api.post("/users/signup/marketing-agency", data);
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};
