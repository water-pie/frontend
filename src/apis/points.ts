import { api } from "./instance";

interface Payment {
  "amount": number,
  "chargedPoints": number,
  "orderId": string,
  "orderName": string,
}

export const initialize = async (token: string, data: Payment) => {
  const response = await api.post("/payments/initiate", data, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  });
  return response.data;
}