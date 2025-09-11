// Define a type for a campaign item
export interface CampaignItem {
  id: number;
  image: string; // Path to image
  title: string;
  offerContent: string;
  mission?: string; // Optional for AppliedCampaigns
  missionDeadline?: string; // Optional for AppliedCampaigns
  selectionDate?: string; // Optional for Ongoing/Finished Campaigns
  status: string;
};