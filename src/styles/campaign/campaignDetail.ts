import styled from "@emotion/styled";
import { buttonColor, buttonHoverColor, borderColor1, borderColor2 } from "../common";

export const Wrapper = styled.div`
  width: 1180px;
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  border-bottom: 1px solid ${borderColor1};

  @media (max-width: 1200px) {
    width: 100%;
    padding: 0 1rem;
    box-sizing: border-box;
  }

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
`;

export const LeftContent = styled.div`
  flex: 1;
  max-width: 700px;

  @media (max-width: 992px) {
    max-width: 100%;
  }
`;

export const RightContent = styled.div`
  width: 350px;

  @media (max-width: 992px) {
    width: 100%;
  }
`;

export const StickyCard = styled.div`
  position: sticky;
  top: 2rem;

  @media (max-width: 992px) {
    position: static;
    top: unset;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  gap: 1rem;

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    min-width: 200px;
  }
`;

export const SubSection = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
`;

export const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
`;

export const Tag = styled.span`
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const TagList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const PointTag = styled(Tag)`
  border: 1px solid ${borderColor1};
  background-color: transparent;
`;

export const NoticeTag = styled(Tag)`
  border: 1px solid ${borderColor2};
`

export const MapPlaceholder = styled.div`
  width:  100%;
  height: 300px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

export const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  white-space: pre-wrap;
  line-height: 1.6;
  color: #333;
`;

export const KeywordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Keyword = styled.span`
  border: 1px solid #ccc;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 14px;
`;

export const Banner = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  padding: 2rem;
  background: #f9f9f9;
  text-align: center;
  
  p {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
  }
`;

export const FloatingCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
  background-color: white;
`;

export const CafeImage = styled.img`
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 15px;

  span:first-of-type {
    font-weight: 500;
    color: #555;
  }

  span:last-of-type {
    font-weight: 500;
    color: #111;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const ApplyButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 1.5rem;
  background: ${buttonColor};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${buttonHoverColor};
  }
`;