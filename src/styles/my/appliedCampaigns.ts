import styled from '@emotion/styled';
import { borderColor1, textColor } from '../common';

export const AppliedCampaignsContainer = styled.div`
  width: 1180px; // Fixed width as requested
  padding: 20px;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${borderColor1};
`;

export const CampaignList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CampaignCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${borderColor1};
  border-radius: 8px;
  padding: 15px;
  gap: 20px;
`;

export const CampaignImage = styled.img`
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

export const CampaignInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const CampaignTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: ${textColor};
  margin: 0;
`;

export const CampaignDescription = styled.p`
  font-size: 14px;
  color: ${textColor};
  margin: 0;
`;

export const CampaignStatusInfo = styled.div`
  display: flex;
  gap: 30px;
  font-size: 14px;
  color: ${textColor};
`;

export const StatusItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StatusLabel = styled.span`
  color: ${borderColor1};
  margin-bottom: 5px;
`;

export const StatusValue = styled.span`
  font-weight: bold;
`;
