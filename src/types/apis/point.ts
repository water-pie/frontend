// src/types/point.ts

export interface PointDepositPayload {
  point_amount: number;
}

export interface PointDepositResponseData {
  id: number;
  type: number;
  processed_time: string;
  point_amount: number;
}

export interface PointDepositResponse {
  status: string;
  message: string;
  data: PointDepositResponseData;
}

export interface PointInfoResponseData {
  point_amount: number;
}

export interface PointInfoResponse {
  status: string;
  message: string;
  data: PointInfoResponseData;
}

export interface PointWithdrawalPayload {
  point_amount: number;
}

export interface PointWithdrawalResponse {
  status: string;
  message: string;
  data: PointDepositResponseData;
}

export interface PointHistory {
  id: number;
  type: number;
  paymant_point: number;
  pay_at: string;
}

export interface PointHistoryResponse {
  status: string;
  message: string;
  data: PointHistory[];
}

export interface AdminPointHistory {
  id: number;
  user_id: string;
  type: number;
  paymant_point: number;
  pay_at: string;
}

export interface AdminPointHistoryResponse {
  status: string;
  message: string;
  data: AdminPointHistory[];
}
