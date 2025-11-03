// src/types/user.ts

export interface UpdateUserInfoPayload {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface InfluencerInfo {
  email: string;
  name: string;
  phoneNumber: string;
  youtubeUrl?: string;
  blogUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}

export interface BrandManagerInfo {
  email: string;
  name: string;
  phoneNumber: string;
  youtubeUrl?: string;
  blogUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  businessRegistrationNumber: string;
  address: string;
  detailedAddress: string;
}

export interface MarketingAgencyInfo {
  email: string;
  name: string;
  phoneNumber: string;
  businessRegistrationNumber: string;
  address: string;
  detailedAddress: string;
}

export interface UpdatePlatformInfoPayload {
  youtubeUrl?: string;
  blogUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}

export type UserInfoResponse = InfluencerInfo | BrandManagerInfo | MarketingAgencyInfo;

export interface InfluencerAdminInfo {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  youtubeUrl: string;
  blogUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
}

export interface InfluencerListResponse {
  status: string;
  message: string;
  data: InfluencerAdminInfo[];
}

export interface BrandManagerAdminInfo {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  youtubeUrl: string;
  blogUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  businessRegistrationNumber: string;
  address: string;
  detailedAddress: string;
}

export interface BrandManagerListResponse {
  status: string;
  message: string;
  data: BrandManagerAdminInfo[];
}

export interface MarketingAgencyAdminInfo {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  businessRegistrationNumber: string;
  address: string;
  detailedAddress: string;
}

export interface MarketingAgencyListResponse {
  status: string;
  message: string;
  data: MarketingAgencyAdminInfo[];
}
