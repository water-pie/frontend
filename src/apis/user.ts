import { api } from "./instance";

interface UpdateUserInfoPayload {
  name: string;
  email: string;
  phoneNumber: string;
}

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

interface InfluencerInfo {
  email: string;
  name: string;
  phoneNumber: string;
  youtubeUrl?: string;
  blogUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}

interface BrandManagerInfo {
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
}

interface MarketingAgencyInfo {
  email: string;
  name: string;
  phoneNumber: string;
  businessRegistrationNumber: string;
  address: string;
  detailedAddress: string;
}

interface UpdatePlatformInfoPayload {
  youtubeUrl?: string;
  blogUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}

export type UserInfoResponse = InfluencerInfo | BrandManagerInfo | MarketingAgencyInfo;

export const updateUserInfoApi = async (data: UpdateUserInfoPayload) => {
  try {
    const response = await api.put("/users/me", data);
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const changePasswordApi = async (data: ChangePasswordPayload) => {
  try {
    const response = await api.put("/users/me/change-password", data);
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const getUserInfoApi = async (): Promise<UserInfoResponse> => {
  try {
    const response = await api.get<UserInfoResponse>("/users/me");
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 인플루언서 연결
export const updatePlatformInfoApi = async (data: UpdatePlatformInfoPayload) => {
  try {
    const response = await api.patch("/users/update/platform", data);
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};
