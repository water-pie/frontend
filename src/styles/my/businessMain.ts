import styled from '@emotion/styled';

export const BusinessMainContainer = styled.div`
  width: 100%;
`;

export const BusinessWelcomeSection = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

export const BusinessProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #eee;
  margin-right: 20px;
`;

export const BusinessWelcomeText = styled.div`
  span {
    font-size: 16px;
    color: #555;
  }
  h2 {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
  }
`;

export const BusinessInfoSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
`;

export const BusinessInfoBox = styled.div`
  background-color: #f9f9f9;
  padding: 10px 20px;
  border-radius: 8px;
  text-align: left;
  font-size: 18px;
  font-weight: bold;

  label {
    display: block;
    font-size: 14px;
    color: #888;
    margin-bottom: 8px;
  }
`;

export const BusinessCampaignActivitySection = styled.section`
  h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

export const BusinessNoActivity = styled.div`
  text-align: center;
  padding: 80px 0;
  border: 1px solid #eee;
  border-radius: 8px;

  p {
    color: #888;
    margin-bottom: 20px;
  }

  button {
    background-color: #eee;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export const CampaignGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

export const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 5px;
`;
