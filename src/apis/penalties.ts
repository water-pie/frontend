import { api } from "./instance";

interface ApplyPenaltyData {
  userId: number;
  reason: string;
}

// 페널티 추가 (관리자)
export const applyPenalty = async (data: ApplyPenaltyData, token: string) => {
  const response = await api.post("/penalties/apply", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 페널티 삭제 (관리자)
export const deletePenalty = async (penaltyId: number, token: string) => {
  const response = await api.delete(`/penalties/${penaltyId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 각 유저 페널티 검색 (관리자)
export const getUserPenalties = async (userId: number, token: string) => {
  const response = await api.get(`/penalties/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 각 유저 페널티 횟수 검색 (관리자)
export const getUserPenaltyCount = async (userId: number, token: string) => {
  const response = await api.get(`/penalties/user/${userId}/count`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 페널티 확인
export const getMyPenalties = async (token: string) => {
  const response = await api.get("/penalties/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 페널티 수 확인
export const getMyPenaltyCount = async (token: string) => {
  const response = await api.get("/penalties/me/count", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};