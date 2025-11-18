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