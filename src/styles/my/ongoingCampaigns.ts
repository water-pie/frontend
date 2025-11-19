import styled from '@emotion/styled';
import { borderColor1, textColor, buttonColor, buttonHoverColor } from '../common';

export const OngoingCampaignsContainer = styled.div`
  width: 100%; // Fixed width
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${borderColor1};

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
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

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 10px;
  }
`;

export const CampaignImage = styled.img`
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 100%;
    height: 150px;
  }
`;

export const CampaignInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CampaignTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: ${textColor};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 16px;
  }
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

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
`;

export const StatusItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StatusLabel = styled.span`
  color: ${textColor};
  margin-bottom: 5px;
`;

export const StatusValue = styled.span`
  font-weight: bold;
`;

export const StatusButton = styled.button`
  background-color: ${buttonColor};
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${buttonHoverColor};
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 8px 10px;
    font-size: 12px;
  }
`;
