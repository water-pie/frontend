import { api } from "./instance";
import {
  type RegisterExperienceRequest,
  type SelectExperienceMembersRequest,
  type ManagedExperienceDetail,
  type ExperienceApplication,
  type CampaignReview,
  type UpdateExperienceStatusRequest,
} from "../types/apis/manage";
import { type Experience } from "../types/apis/experience";

interface RegisterExperienceResponse {
  status: string;
  message: string;
  data: Record<string, never>; // Empty object
}

interface GetManagedExperienceListResponse {
  status: string;
  message: string;
  data: Experience[];
}

interface DeleteExperienceResponse {
  status: string;
  message: string;
  data: Record<string, never>;
}

interface SelectExperienceMembersResponse {
  status: string;
  message: string;
  data: Record<string, never>;
}

interface UpdateExperienceResponse {
  status: string;
  message: string;
  data: Record<string, never>;
}

interface GetManagedExperienceDetailResponse {
  status: string;
  message: string;
  data: ManagedExperienceDetail;
}

interface GetExperienceApplicationListResponse {
  status: string;
  message: string;
  data: ExperienceApplication[];
}

interface GetCampaignReviewListResponse {
  status: string;
  message: string;
  data: CampaignReview[];
}

interface ModerateReviewResponse {
  status: string;
  message: string;
  data: Record<string, never>;
}

interface UpdateExperienceStatusResponse {
  status: string;
  message: string;
  data: Record<string, never>;
}

export const registerExperienceApi = async (
  data: RegisterExperienceRequest,
  president_image: File,
  images: File[]
): Promise<RegisterExperienceResponse> => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  formData.append("president_image", president_image);
  images.forEach((image) => {
    formData.append("images", image);
  });

  try {
    const response = await api.post<RegisterExperienceResponse>(
      "/experience-manage/insert",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 체험단 목록 조회 (담당자가 등록한 체험단만 조회)
export const getManagedExperienceListApi = async (): Promise<GetManagedExperienceListResponse> => {
  try {
    const response = await api.get<GetManagedExperienceListResponse>(
      "/experience-manage/list"
    );
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 체험단 삭제
export const deleteExperienceApi = async (id: number): Promise<DeleteExperienceResponse> => {
  try {
    const response = await api.delete<DeleteExperienceResponse>(`/experience-manage/${id}`);
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 체험단 선정
export const selectExperienceMembersApi = async (
  id: number,
  data: SelectExperienceMembersRequest
): Promise<SelectExperienceMembersResponse> => {
  try {
    const response = await api.post<SelectExperienceMembersResponse>(
      `/experience-manage/${id}/select`,
      data
    );
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 체험단 수정
export const updateExperienceApi = async (
  id: number,
  data: RegisterExperienceRequest,
  president_image?: File,
  images?: File[]
): Promise<UpdateExperienceResponse> => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  if (president_image) {
    formData.append("president_image", president_image);
  }
  if (images) {
    images.forEach((image) => {
      formData.append("images", image);
    });
  }

  try {
    const response = await api.put<UpdateExperienceResponse>(
      `/experience-manage/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 체험단 상세 조회
export const getManagedExperienceDetailApi = async (id: number): Promise<GetManagedExperienceDetailResponse> => {
  try {
    const response = await api.get<GetManagedExperienceDetailResponse>(`/experience-manage/detail/${id}`);
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 체험단 신청 목록 조회
export const getExperienceApplicationListApi = async (
  id: number,
  status?: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED"
): Promise<GetExperienceApplicationListResponse> => {
  try {
    const response = await api.get<GetExperienceApplicationListResponse>(
      `/experience-manage/${id}/applications`,
      {
        params: {
          status,
        },
      }
    );
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 캠페인 리뷰 목록 조회
export const getCampaignReviewListApi = async (id: number): Promise<GetCampaignReviewListResponse> => {
  try {
    const response = await api.get<GetCampaignReviewListResponse>(`/experience-manage/${id}/reviews`);
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 체험단 리뷰 심사
export const moderateReviewApi = async (
  applicationId: number,
  decision: "approve" | "reject"
): Promise<ModerateReviewResponse> => {
  try {
    const response = await api.post<ModerateReviewResponse>(
      `/applications/${applicationId}/review/${decision}`
    );
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

// 체험단 상태 변경
export const updateExperienceStatusApi = async (
  id: number,
  data: UpdateExperienceStatusRequest
): Promise<UpdateExperienceStatusResponse> => {
  try {
    const response = await api.post<UpdateExperienceStatusResponse>(
      `/experience-manage/${id}/status`,
      data
    );
    return response.data;
  } catch (e) {
    throw new Error(`${e}`);
  }
};
