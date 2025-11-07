import { api } from "./instance";

interface Event {
  id: number;
  title: string;
  create_at: string;
  update_at: string;
}

interface EventDetail extends Event {
  content: string;
  images: string[];
}

interface GetEventListResponse {
  status: string;
  message: string;
  data: Event[];
}

interface GetEventDetailResponse {
  status: string;
  message: string;
  data: EventDetail;
}

interface CreateEventResponse {
  status: string;
  message: string;
  data: {};
}

interface UpdateEventResponse {
  status: string;
  message: string;
  data: {
    [key: string]: any;
  };
}

interface DeleteEventResponse {
  status: string;
  message: string;
  data: {
    [key: string]: any;
  };
}

// 이벤트 목록 조회
export const getEventListApi = async (): Promise<GetEventListResponse> => {
  try {
    const response = await api.get<GetEventListResponse>("/event/list");
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 이벤트 상세 조회
export const getEventDetailApi = async (id: number): Promise<GetEventDetailResponse> => {
  try {
    const response = await api.get<GetEventDetailResponse>(`/event/${id}`);
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 이벤트 등록 (관리자)
export const createEventApi = async (data: FormData, token: string) => {
  try {
    const response = await api.post<CreateEventResponse>("/event", data, {
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

// 이벤트 수정 (관리자)
export const updateEventApi = async (id: number, data: FormData, token: string) => {
  try {
    const response = await api.put<UpdateEventResponse>(`/event/${id}`, data, {
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

// 이벤트 삭제 (관리자)
export const deleteEventApi = async (id: number, token: string) => {
  try {
    const response = await api.delete<DeleteEventResponse>(`/event/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};