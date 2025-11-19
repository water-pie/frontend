import styled from '@emotion/styled';

export const MainContainer = styled.div`
  width: 100%;
`;

export const WelcomeSection = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 40px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url('/account.png');
  background-size: cover;
  background-position: center;
  margin-right: 20px;
`;

export const WelcomeText = styled.div`
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

export const InfoSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const Title = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;

  h3 {
    margin: 0;
  }

  span {
    cursor: pointer;
    :hover {
      font-weight: 600;
    }
  }
`;

export const InfoBox = styled.div`
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

export const SocialContainer = styled.section`
  margin-bottom: 40px;

  h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

export const SocialSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  img {
    width: 24px;
    height: 24px;
    margin-right: 15px;
  }

  span {
    flex-grow: 1;
  }

  :hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    padding: 10px;
    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    span {
      font-size: 14px;
    }
  }
`;

export const CampaignActivitySection = styled.section`
  h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

export const NoActivity = styled.div`
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

    @media (max-width: 480px) {
      width: 80%;
      padding: 8px 15px;
      font-size: 14px;
    }
  }
`;
