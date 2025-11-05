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

interface ApplyExperienceRequest {
  pitchText: string;
  address?: string;
  detailAddress?: string;
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

export const getExperienceDetailApi = async (id: number): Promise<GetExperienceDetailResponse> => {
  try {
    const response = await api.get<GetExperienceDetailResponse>(`/experience/${id}`);
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const applyExperienceApi = async (id: number, data: ApplyExperienceRequest, token: string): Promise<ApplyExperienceResponse> => {
  try {
    const response = await api.post<ApplyExperienceResponse>(
      `/experience/${id}/apply`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const cancelExperienceApi = async (id: number, token: string): Promise<CancelExperienceResponse> => {
  try {
    const response = await api.delete<CancelExperienceResponse>(
      `/experience/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};
export const getOngoingExperiencesApi = async (token: string): Promise<GetOngoingExperiencesResponse> => {
  try {
    const response = await api.get<GetOngoingExperiencesResponse>(
      "/experience/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const getPastExperiencesApi = async (token: string): Promise<GetPastExperiencesResponse> => {
  try {
    const response = await api.get<GetPastExperiencesResponse>(
      "/experience/me/before",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const registerReviewApi = async (id: number, data: RegisterReviewRequest, token: string): Promise<RegisterReviewResponse> => {
  try {
    const response = await api.post<RegisterReviewResponse>(
      `/experience/${id}/review`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const deleteReviewApi = async (exp_id: number, review_id: number, token: string): Promise<DeleteReviewResponse> => {
  try {
    const response = await api.delete<DeleteReviewResponse>(
      `/experience/${exp_id}/${review_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const getMyReviewsApi = async (token: string): Promise<GetMyReviewsResponse> => {
  try {
    const response = await api.get<GetMyReviewsResponse>(
      "/experience/me/reviews",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};