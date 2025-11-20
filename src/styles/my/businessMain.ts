import styled from '@emotion/styled';

export const BusinessMainContainer = styled.div`
  width: 100%;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const BusinessWelcomeSection = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
  }
`;

export const BusinessProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #eee;
  margin-right: 20px;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    margin-right: 0;
    margin-bottom: 15px;
  }
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

  @media (max-width: 768px) {
    text-align: center;
    width: 100%;
    span {
      font-size: 14px;
    }
    h2 {
      font-size: 20px;
    }
  }
`;

export const BusinessInfoSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Stack items on small screens */
  }
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

  @media (max-width: 768px) {
    padding: 15px;
    font-size: 16px;
    label {
      font-size: 12px;
    }
  }
`;

export const BusinessCampaignActivitySection = styled.section`
  h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 18px;
      margin-bottom: 15px;
    }
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

  @media (max-width: 768px) {
    padding: 40px 0;
    p {
      font-size: 14px;
      margin-bottom: 15px;
    }
    button {
      padding: 8px 15px;
      font-size: 14px;
    }
  }
`;

export const CampaignGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Single column on small screens */
  }
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

  @media (max-width: 768px) {
    padding: 8px 10px;
    font-size: 14px;
  }
`;
