import { api } from "./instance";

interface Notice {
  id: number;
  title: string;
  create_at: string;
  update_at: string;
}

interface NoticeDetail extends Notice {
  content: string;
  images: string[];
}

interface GetNoticeListResponse {
  status: string;
  message: string;
  data: Notice[];
}

interface GetNoticeDetailResponse {
  status: string;
  message: string;
  data: NoticeDetail;
}

interface CreateNoticeResponse {
  status: string;
  message: string;
  data: {};
}

interface UpdateNoticeResponse {
  status: string;
  message: string;
  data: {};
}

interface DeleteNoticeResponse {
  status: string;
  message: string;
  data: {};
}

// 공지사항 목록 조회 todo
export const getNoticeListApi = async (): Promise<GetNoticeListResponse> => {
  try {
    const response = await api.get<GetNoticeListResponse>("/notice/list");
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 공지사항 상세 조회 todo
export const getNoticeDetailApi = async (id: number): Promise<GetNoticeDetailResponse> => {
  try {
    const response = await api.get<GetNoticeDetailResponse>(`/notice/${id}`);
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 공지사항 생성 (관리자)
export const createNoticeApi = async (data: FormData, token: string) => {
  try {
    const response = await api.post<CreateNoticeResponse>("/notice", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    });
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 공지사항 수정 (관리자)
export const updateNoticeApi = async (id: number, data: FormData, token: string) => {
  try {
    const response = await api.put<UpdateNoticeResponse>(`/notice/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 공지사항 삭제 (관리자)
export const deleteNoticeApi = async (id: number, token: string) => {
  try {
    const response = await api.delete<DeleteNoticeResponse>(`/notice/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};