import { api } from "./instance";

interface InquiryData {
  title: string;
  content: string;
}

// 문의사항 등록
export const createInquiry = async (data: InquiryData, token: string) => {
  const response = await api.post("/inquiries", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 자신의 문의사항 조회
export const getMyInquiries = async (token: string) => {
  const response = await api.get("/inquiries", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 특정 문의사항 조회
export const getInquiryById = async (id: number, token?: string) => {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response = await api.get(`/inquiries/${id}`, config);
  return response.data;
};

// 문의사항 수정
export const updateInquiry = async (id: number, data: InquiryData, token: string) => {
  const response = await api.put(`/inquiries/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 문의사항 삭제
export const deleteInquiry = async (id: number, token: string) => {
  const response = await api.delete(`/inquiries/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 문의 답변 추가 (관리자)
export const addInquiryAnswer = async (id: number, answer: string, token: string) => {
  const response = await api.patch(`/admin/inquiries/${id}`, { answer }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 문의 답변 삭제 (관리자)
export const deleteInquiryAnswer = async (id: number, token: string) => {
  const response = await api.delete(`/admin/inquiries/${id}/answer`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 문의 전체 조회 (관리자)
export const getAllInquiries = async (token: string) => {
  const response = await api.get("/admin/inquiries", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 특정 문의 조회 (관리자)
export const getInquiryByIdForAdmin = async (id: number, token: string) => {
  const response = await api.get(`/admin/inquiries/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
