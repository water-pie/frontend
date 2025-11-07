import { create } from "zustand";

interface CampaignCreationState {
  // Step 1
  president_image: File | null;
  company_name: string;
  manager_call_num: string;
  // Step 2
  promotionType: "visiting" | "take-out" | "shipping" | "purchase" | "";
  address: string;
  detail_address: string;
  product_url: string;
  category: string;
  channels: string[];
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
  promotionType: "" as "visiting" | "take-out" | "shipping" | "purchase" | "",
  address: "",
  detail_address: "",
  product_url: "",
  category: "",
  channels: [],
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