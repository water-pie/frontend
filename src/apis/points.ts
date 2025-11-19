import { api } from "./instance";

interface Payment {
  "amount": number,
  "chargedPoints": number,
  "orderId": string,
  "orderName": string,
}

interface ConfirmPayment {
  paymentKey: string;
  orderId: string;
  amount: number;
  status: string;
}

export const initialize = async (token: string, data: Payment) => {
  const response = await api.post("/payments/initiate", data, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  });
  return response.data;
};

export const confirmPayment = async (token: string, data: ConfirmPayment) => {
  const response = await api.post("/payments/confirm", data, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const historyPayment = async (token: string) => {
  const response = await api.get("/payments/history", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.data;
}

// 출금 요청 조회 API
export const getWithdrawals = async (token: string, status?: string) => {
  const response = await api.get("/admin/point/withdrawals", {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      status: status || undefined
    }
  });
  return response.data.data;
};


// 포인트 트랜잭션 조회 API
export const getPointTransactions = async (
  token: string,
  page = 1,
  limit = 20,
  userId?: number,
  status?: string
) => {
  const response = await api.get("/admin/point/transactions", {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      page,
      limit,
      userId,
      status
    }
  });

  return response.data.data;
};

export const requestWithdrawal = async (
  token: string,
  data: {
    amount: number;
    bankCode: string;
    accountNumber: string;
    holderName: string;
  }
) => {
  const response = await api.post("/withdrawals", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getPoint = async (token: string) => {
  return (await api.get("/point", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })).data.data;
}