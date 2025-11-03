// src/apis/point.ts
import { api } from "./instance";
import {
  type AdminPointHistoryResponse,
  type PointDepositPayload,
  type PointDepositResponse,
  type PointHistoryResponse,
  type PointInfoResponse,
  type PointWithdrawalPayload,
  type PointWithdrawalResponse
} from "types/apis/point";

// 포인트 충전
export const depositPointApi = async (data: PointDepositPayload, token: string) => {
  try {
    const response = await api.post<PointDepositResponse>("/point/deposit", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};
    
// 포인트 입출금 내역 조회
export const getPointHistoryApi = async (token: string) => {
  try {
    const response = await api.get<PointHistoryResponse>("/point/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};
    
// 전체 포인트 입출금 내역 조회 (admin)
export const getAdminPointHistoryApi = async (token: string) => {
  try {
    const response = await api.get<AdminPointHistoryResponse>("/point/list-all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 포인트 조회
export const getPointInfoApi = async (token: string) => {
  try {
    const response = await api.get<PointInfoResponse>("/point", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 포인트 출금
export const withdrawPointApi = async (data: PointWithdrawalPayload, token: string) => {
  try {
    const response = await api.post<PointWithdrawalResponse>("/point/withdrawal", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};