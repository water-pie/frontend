import { create } from "zustand";

interface CampaignCreationState {
  // Step 1
  president_image: File | null;
  company_name: string;
  manager_call_num: string;
  // Step 2
  promotionType: "방문형" | "포장형" | "배송형" | "구매형" | "";
  address: string;
  detail_address: string;
  product_url: string;
  category: string;
  dataType: 1 | 2 | 3 | null; // Changed to numeric type
  channels: string[];
  requiresPremiumPoint: boolean;
  // Step 3
  application_start_date: string;
  application_end_date: string;
  member_announcement_time: string; // Renamed from registration_deadline
  experience_start_date: string;
  experience_end_date: string;
  end_review_time: string;
  available_days: string[];
  available_time_start: string;
  available_time_end: string;
  possible_visit_now: boolean;
  notices_to_visit: string;
  available_weekdays_weekends: "" | "평일" | "주말";
  available_holiday: "" | "가능" | "불가능";
  possible_same_day_reservation: "" | "가능" | "불가능";
  // Step 4
  mission: string;
  keywords: string[];
  // Step 5
  offer_content: string;
  member_num: number;
  each_member_point: number;

  // images
  images: File[];
  title: string;

  // Actions
  set: (data: Partial<CampaignCreationState>) => void;
  reset: () => void;
}

const initialState = {
  president_image: null,
  company_name: "",
  manager_call_num: "",
  promotionType: "" as "방문형" | "포장형" | "배송형" | "구매형" | "",
  address: "",
  detail_address: "",
  product_url: "",
  category: "",
  dataType: null, // Initial state for new field, null for numeric
  channels: [],
  requiresPremiumPoint: false,
  application_start_date: "",
  application_end_date: "",
  member_announcement_time: "",
  experience_start_date: "",
  experience_end_date: "",
  end_review_time: "",
  available_days: [],
  available_time_start: "",
  available_time_end: "",
  possible_visit_now: false,
  notices_to_visit: "",
  available_weekdays_weekends: "" as const,
  available_holiday: "" as const,
  possible_same_day_reservation: "" as const,
  mission: "",
  keywords: ["", "", "", "", ""],
  offer_content: "",
  member_num: 0,
  each_member_point: 0,
  images: [],
  title: "",
};

export const useCampaignCreationStore = create<CampaignCreationState>((set) => ({
  ...initialState,
  set: (data) => set((state) => ({ ...state, ...data })),
  reset: () => set(initialState),
}));