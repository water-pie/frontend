import styled from "@emotion/styled";

export const TitleBox = styled.div`
  position: relative;
  width: 1180px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CampaignGrid = styled.div`
  width: 1180px;
  display: grid;
  grid-column: 4;
  grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
  gap: 20px;
  justify-items: center;
`;