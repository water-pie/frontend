import { api } from "./instance";
import {
  type Experience,
  type ExperienceDetail
} from "../types/apis/experience";

interface GetExperienceListResponse {
  status: string;
  message: string;
  data: Experience[];
}

interface GetExperienceDetailResponse {
  status: string;
  message: string;
  data: ExperienceDetail;
}

interface ApplyExperienceResponse {
  status: string;
  message: string;
  data: {
    exp_id: number;
  };
}

interface CancelExperienceResponse {
  status: string;
  message: string;
  data: Record<string, never>; // Empty object
}

interface UserExperienceSummary {
  exp_id: number;
  title: string;
  schedule: string;
  process_status: number;
}

interface GetOngoingExperiencesResponse {
  status: string;
  message: string;
  data: UserExperienceSummary[];
}

interface GetPastExperiencesResponse {
  status: string;
  message: string;
  data: UserExperienceSummary[];
}

interface RegisterReviewRequest {
  urls: string[];
  message: string;
}

interface RegisterReviewResponse {
  status: string;
  message: string;
  data: Record<string, never>; // Empty object
}

interface DeleteReviewResponse {
  status: string;
  message: string;
  data: Record<string, never>; // Empty object
}

interface MyReviewSummary {
  campaignId: number;
  campaignTitle: string;
  reviewId: number;
  reviewMessage: string;
  reviewUrls: string[];
  submittedAt: string;
}

interface GetMyReviewsResponse {
  status: string;
  message: string;
  data: MyReviewSummary[];
}

export const getExperienceListApi = async (): Promise<GetExperienceListResponse> => {
  try {
    const response = await api.get<GetExperienceListResponse>("/experience/list");
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const searchExperienceListApi = async (keyword: string): Promise<GetExperienceListResponse> => {
  try {
    const response = await api.get<GetExperienceListResponse>(`/experience/list?keyword=${keyword}`);
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 체험단 상세 조회 todo
export const getExperienceDetailApi = async (id: number): Promise<GetExperienceDetailResponse> => {
  try {
    const response = await api.get<GetExperienceDetailResponse>(`/experience/${id}`);
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 체험 신청 todo
export const applyExperienceApi = async (id: number): Promise<ApplyExperienceResponse> => {
  try {
    const response = await api.post<ApplyExperienceResponse>(`/experience/${id}`);
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 체험 신청 취소 todo 
export const cancelExperienceApi = async (id: number): Promise<CancelExperienceResponse> => {
  try {
    const response = await api.delete<CancelExperienceResponse>(`/experience/${id}`);
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 진행중 체험 조회 todo
export const getOngoingExperiencesApi = async (): Promise<GetOngoingExperiencesResponse> => {
  try {
    const response = await api.get<GetOngoingExperiencesResponse>("/experience/me");
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 지난 체험 조회 todo
export const getPastExperiencesApi = async (): Promise<GetPastExperiencesResponse> => {
  try {
    const response = await api.get<GetPastExperiencesResponse>("/experience/me/before");
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 리뷰 등록 todo
export const registerReviewApi = async (id: number, data: RegisterReviewRequest): Promise<RegisterReviewResponse> => {
  try {
    const response = await api.post<RegisterReviewResponse>(`/experience/${id}/review`, data);
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 리뷰 삭제 todo 
export const deleteReviewApi = async (exp_id: number, review_id: number): Promise<DeleteReviewResponse> => {
  try {
    const response = await api.delete<DeleteReviewResponse>(`/experience/${exp_id}/${review_id}`);
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 내 리뷰 목록 조회 todo
export const getMyReviewsApi = async (): Promise<GetMyReviewsResponse> => {
  try {
    const response = await api.get<GetMyReviewsResponse>("/experience/me/reviews");
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};
