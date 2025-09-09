
export interface CampaignData {
  id: number;
  writer: string;
  data_type: number; // 1: 지역, 2: 제품
  company_name: string;
  manager_call_num: string;
  product_offer_type: number; // 1: 방문형, 2: 포장형, 3: 배송형, 4: 구매형
  address: string;
  detail_address: string;
  cartegory: string;
  product_url: string;
  chennals: number[]; // 1: 블로그, 2: 인스타, 3: 틱톡, 4: 유튜브
  possible_time_application: [string, string];
  member_announcement_time: string;
  experience_time: [string, string];
  end_review_time: string;
  possible_time?: [string, string];
  possible_week_days?: number[];
  possible_visit_now?: boolean;
  notices_to_visit?: string;
  experience_mission: string;
  marketing_keywords: string[];
  title: string;
  offer_content: string;
  member_num: number;
  applicated_num: number;
  each_member_point: number;
  image_urls: string[];
  selected_members?: string[];
  create_at: string;
  update_at: string;
}

const formatDate = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const inAWeek = new Date(today);
inAWeek.setDate(today.getDate() + 7);
const inTwoWeeks = new Date(today);
inTwoWeeks.setDate(today.getDate() + 14);


export const campaigns: CampaignData[] = [
  {
    id: 1,
    image_urls: ["/card/card5.png"],
    title: "[충북] 컵빙수가 맛있는 동네 카페",
    offer_content: "컵빙수 무료 제공",
    applicated_num: 20,
    member_num: 3,
    each_member_point: 50000,
    experience_mission: "블로그 포스팅 3회 작성",
    chennals: [1],
    writer: "카페 사장님",
    data_type: 1,
    company_name: "동네 카페",
    manager_call_num: "010-1111-2222",
    product_offer_type: 1,
    address: "충북 청주시 상당구",
    detail_address: "123-45",
    cartegory: "음식점",
    product_url: "",
    possible_time_application: [formatDate(today), formatDate(inAWeek)],
    member_announcement_time: formatDate(inAWeek),
    experience_time: [formatDate(inAWeek), formatDate(inTwoWeeks)],
    end_review_time: formatDate(inTwoWeeks),
    marketing_keywords: ["충북맛집", "카페", "컵빙수"],
    create_at: formatDate(today),
    update_at: formatDate(today),
    notices_to_visit: `평일: 오전 10시 ~ 오후 8시 오픈
주말: 오전 11시 ~ 오후 7시 오픈

방문 가능 날짜: 화 / 수 / 목 / 토

해당 시간 준수해주세요`,
  },
  {
    id: 2,
    image_urls: ["/card/card1.png"],
    title: "[대전] 푹신한 에어 매트리스",
    offer_content: "에어 매트리스 제공",
    applicated_num: 12,
    member_num: 3,
    each_member_point: 30000,
    experience_mission: "인스타그램 릴스 2회 생성",
    chennals: [2],
    writer: "매트리스 대표",
    data_type: 2,
    company_name: "푹신푹신",
    manager_call_num: "010-3333-4444",
    product_offer_type: 3, // 배송형
    address: "대전 유성구",
    detail_address: "543-21",
    cartegory: "생활용품",
    product_url: "http://example.com/mattress",
    possible_time_application: [formatDate(today), formatDate(inAWeek)],
    member_announcement_time: formatDate(inAWeek),
    experience_time: [formatDate(inAWeek), formatDate(inTwoWeeks)],
    end_review_time: formatDate(inTwoWeeks),
    marketing_keywords: ["매트리스", "에어매트리스", "꿀잠"],
    create_at: formatDate(today),
    update_at: formatDate(today),
  },
  {
    id: 3,
    image_urls: ["/card/card2.png"],
    title: "[경기] 맛있는 텐동 음식 시식",
    offer_content: "텐동 무료 제공",
    applicated_num: 3,
    member_num: 3,
    each_member_point: 70000,
    experience_mission: "틱톡 1분 영상 촬영",
    chennals: [3],
    writer: "텐동집 사장",
    data_type: 1,
    company_name: "텐동의 신",
    manager_call_num: "010-5555-6666",
    product_offer_type: 1, // 방문형
    address: "경기도 수원시 팔달구",
    detail_address: "678-90",
    cartegory: "음식점",
    product_url: "",
    possible_time_application: [formatDate(today), formatDate(tomorrow)],
    member_announcement_time: formatDate(tomorrow),
    experience_time: [formatDate(tomorrow), formatDate(inAWeek)],
    end_review_time: formatDate(inAWeek),
    marketing_keywords: ["텐동", "수원맛집", "일식"],
    create_at: formatDate(today),
    update_at: formatDate(today),
  },
  {
    id: 4,
    image_urls: ["/card/card3.png"],
    title: "[대천] 대천 해수욕장 노을",
    offer_content: "해수욕장 이용 + 노을 구경",
    applicated_num: 2,
    member_num: 3,
    each_member_point: 45000,
    experience_mission: "실사용 영상 2회 게시",
    chennals: [4],
    writer: "관광청",
    data_type: 1,
    company_name: "대천시",
    manager_call_num: "010-7777-8888",
    product_offer_type: 1, // 방문형
    address: "충남 보령시",
    detail_address: "해수욕장",
    cartegory: "여행",
    product_url: "",
    possible_time_application: [formatDate(today), formatDate(inAWeek)],
    member_announcement_time: formatDate(inAWeek),
    experience_time: [formatDate(inAWeek), formatDate(inTwoWeeks)],
    end_review_time: formatDate(inTwoWeeks),
    marketing_keywords: ["대천", "해수욕장", "노을"],
    create_at: formatDate(today),
    update_at: formatDate(today),
  },
    {
    id: 5,
    image_urls: ["/card/card5.png"],
    title: "[충북] 컵빙수가 맛있는 동네 카페",
    offer_content: "컵빙수 무료 제공",
    applicated_num: 20,
    member_num: 3,
    each_member_point: 50000,
    experience_mission: "블로그 포스팅 3회 작성",
    chennals: [1],
    writer: "카페 사장님",
    data_type: 1,
    company_name: "동네 카페",
    manager_call_num: "010-1111-2222",
    product_offer_type: 1,
    address: "충북 청주시 상당구",
    detail_address: "123-45",
    cartegory: "음식점",
    product_url: "",
    possible_time_application: [formatDate(today), formatDate(inAWeek)],
    member_announcement_time: formatDate(inAWeek),
    experience_time: [formatDate(inAWeek), formatDate(inTwoWeeks)],
    end_review_time: formatDate(inTwoWeeks),
    marketing_keywords: ["충북맛집", "카페", "컵빙수"],
    create_at: formatDate(today),
    update_at: formatDate(today),
    notices_to_visit: `평일: 오전 10시 ~ 오후 8시 오픈
주말: 오전 11시 ~ 오후 7시 오픈

방문 가능 날짜: 화 / 수 / 목 / 토

해당 시간 준수해주세요`,
  },
  {
    id: 6,
    image_urls: ["/card/card1.png"],
    title: "[대전] 푹신한 에어 매트리스",
    offer_content: "에어 매트리스 제공",
    applicated_num: 12,
    member_num: 3,
    each_member_point: 30000,
    experience_mission: "인스타그램 릴스 2회 생성",
    chennals: [2],
    writer: "매트리스 대표",
    data_type: 2,
    company_name: "푹신푹신",
    manager_call_num: "010-3333-4444",
    product_offer_type: 3, // 배송형
    address: "대전 유성구",
    detail_address: "543-21",
    cartegory: "생활용품",
    product_url: "http://example.com/mattress",
    possible_time_application: [formatDate(today), formatDate(inAWeek)],
    member_announcement_time: formatDate(inAWeek),
    experience_time: [formatDate(inAWeek), formatDate(inTwoWeeks)],
    end_review_time: formatDate(inTwoWeeks),
    marketing_keywords: ["매트리스", "에어매트리스", "꿀잠"],
    create_at: formatDate(today),
    update_at: formatDate(today),
  },
  {
    id: 7,
    image_urls: ["/card/card2.png"],
    title: "[경기] 맛있는 텐동 음식 시식",
    offer_content: "텐동 무료 제공",
    applicated_num: 3,
    member_num: 3,
    each_member_point: 70000,
    experience_mission: "틱톡 1분 영상 촬영",
    chennals: [3],
    writer: "텐동집 사장",
    data_type: 1,
    company_name: "텐동의 신",
    manager_call_num: "010-5555-6666",
    product_offer_type: 1, // 방문형
    address: "경기도 수원시 팔달구",
    detail_address: "678-90",
    cartegory: "음식점",
    product_url: "",
    possible_time_application: [formatDate(today), formatDate(tomorrow)],
    member_announcement_time: formatDate(tomorrow),
    experience_time: [formatDate(tomorrow), formatDate(inAWeek)],
    end_review_time: formatDate(inAWeek),
    marketing_keywords: ["텐동", "수원맛집", "일식"],
    create_at: formatDate(today),
    update_at: formatDate(today),
  },
  {
    id: 8,
    image_urls: ["/card/card3.png"],
    title: "[대천] 대천 해수욕장 노을",
    offer_content: "해수욕장 이용 + 노을 구경",
    applicated_num: 2,
    member_num: 3,
    each_member_point: 45000,
    experience_mission: "실사용 영상 2회 게시",
    chennals: [4],
    writer: "관광청",
    data_type: 1,
    company_name: "대천시",
    manager_call_num: "010-7777-8888",
    product_offer_type: 1, // 방문형
    address: "충남 보령시",
    detail_address: "해수욕장",
    cartegory: "여행",
    product_url: "",
    possible_time_application: [formatDate(today), formatDate(inAWeek)],
    member_announcement_time: formatDate(inAWeek),
    experience_time: [formatDate(inAWeek), formatDate(inTwoWeeks)],
    end_review_time: formatDate(inTwoWeeks),
    marketing_keywords: ["대천", "해수욕장", "노을"],
    create_at: formatDate(today),
    update_at: formatDate(today),
  },
];
