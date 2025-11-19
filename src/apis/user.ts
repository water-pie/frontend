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

export const updateUserInfoApi = async (data: UpdateUserInfoPayload, token: string) => {
  try {
    const response = await api.put("/users/me", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const changePasswordApi = async (data: ChangePasswordPayload, token: string) => {
  try {
    const response = await api.put("/users/me/change-password", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const getUserInfoApi = async (token: string) => {
  try {
    const response = await api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const updatePlatformInfoApi = async (data: UpdatePlatformInfoPayload, token: string) => {
  try {
    const response = await api.patch("/users/update/platform", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 인플루언서 목록 (관리자)
export const getInfluencerListApi = async (token: string) => {
  try {
    const response = await api.get<InfluencerListResponse>("/users/type/influencers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 브랜드 매니저 목록 (관리자)
export const getBrandManagerListApi = async (token: string) => {
  try {
    const response = await api.get<BrandManagerListResponse>("/users/type/brand-managers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 마케팅 대행사 목록 (관리자)
export const getMarketingAgencyListApi = async (token: string) => {
  try {
    const response = await api.get<MarketingAgencyListResponse>("/users/type/marketing-agencies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 신청 목록 불러오기 (관리자)
export const getApplicationUserListApi = async (token: string) => {
  try {
    const response = await api.get("/admin/users/pending", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const approveUserApi = async (token: string, userId: number) => {
  try {
    const response = await api.patch(`/admin/users/${userId}/approve`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(response);
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const rejectUserApi = async (token: string, userId: number) => {
  try {
    const response = await api.patch(`/admin/users/${userId}/reject`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(response);
  } catch (e) {
    throw new Error(`${e}`);
  }
};