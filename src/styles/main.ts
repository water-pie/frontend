import styled from "@emotion/styled";

export const TitleBox = styled.div`
  position: relative;
  width: 1180px;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 1180px) {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
`;

export const CampaignGrid = styled.div`
  width: 1180px;
  display: grid;
  grid-column: 4;
  grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
  gap: 20px;
  justify-items: center;

  @media (max-width: 1180px) {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const NoResultsMessage = styled.div`
  text-align: center;
  padding: 50px 0; /* Add some vertical padding */
  font-size: 18px;
  color: #555; /* A slightly darker grey for better readability */
  width: 100%; /* Ensure it takes full width */
`;