import { api } from "./instance";
import {
  type UpdateUserInfoPayload,
  type ChangePasswordPayload,
  type UpdatePlatformInfoPayload,
  type InfluencerListResponse,
  type BrandManagerListResponse,
  type MarketingAgencyListResponse,
  type ResetPasswordPayload,
} from "types/apis/user";

export const resetPassword = async (data: ResetPasswordPayload) => {
  try {
    const response = await api.post('/users/reset-password', data);
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
}

export const updateUserInfoApi = async (data: UpdateUserInfoPayload) => {
  try {
    return (await api.put("/users/me", data)).data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const changePasswordApi = async (data: ChangePasswordPayload) => {
  try {
    return (await api.put("/users/me/change-password", data)).data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const getUserInfoApi = async () => {
  try {
    return (await api.get("/users/me")).data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const updatePlatformInfoApi = async (data: UpdatePlatformInfoPayload, ) => {
  try {
    return (await api.patch("/users/update/platform", data)).data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 인플루언서 목록 (관리자)
export const getInfluencerListApi = async () => {
  try {
    return (await api.get<InfluencerListResponse>("/users/type/influencers")).data.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 브랜드 매니저 목록 (관리자)
export const getBrandManagerListApi = async () => {
  try {
    return (await api.get<BrandManagerListResponse>("/users/type/brand-managers")).data.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 마케팅 대행사 목록 (관리자)
export const getMarketingAgencyListApi = async () => {
  try {
    return (await api.get<MarketingAgencyListResponse>("/users/type/marketing-agencies")).data.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 신청 목록 불러오기 (관리자)
export const getApplicationUserListApi = async () => {
  try {
    return (await api.get("/admin/users/pending")).data.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const approveUserApi = async (userId: number) => {
  try {
    await api.patch(`/admin/users/${userId}/approve`);
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const rejectUserApi = async (userId: number) => {
  try {
    await api.patch(`/admin/users/${userId}/reject`);
  } catch (e) {
    throw new Error(`${e}`);
  }
};