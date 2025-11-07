export interface Experience {
  id: number;
  data_type: 1 | 2;
  product_offer_type: 1 | 2 | 3 | 4;
  category: string;
  channels: number[];
  possible_time_application_left: number;
  title: string;
  offer_content: string;
  member_num: number;
  applicated_num: number;
  each_member_point: number;
  image_urls: string[];
  is_point_experience: boolean;
}

export interface ExperienceDetail {
  id: number;
  writer: string;
  data_type: 1 | 2; // 1=지역 //2=제품
  company_name: string;
  manager_call_num: string;
  product_offer_type: 1 | 2 | 3 | 4; // 1=방문형, 2=포장형, 3=배송형, 4=구매형
  address: string;
  detail_address: string;
  category: string;
  product_url: string;
  channels: number[]; // 1. 인스타그램 ....
  possible_time_application: string[]; // [0]이 시작 시간
  member_announcement_time: string;
  experience_time: string[];
  end_review_time: string;

  // 방문형 일 시에만 추가
  possible_time: string[];
  possible_week_days: number[]; // 0부터 일요일....
  possible_visit_now: boolean;
  notices_to_visit: string;
  //------------//

  experience_mission: string;
  marketing_keywords: string[];
  title: string;
  offer_content: string;
  member_num: number;
  applicated_num: number;
  each_member_point: number;
  image_urls: string[];
  selected_members?: string[]; //선정시 반환.
  create_at: string;
  update_at: string;
}
