import styled from "@emotion/styled";

export const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 400px;
`;

export const ImageCard = styled.div`
  border-radius: 3px;
  border: 0.5px solid #838383;
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 3px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  min-height: 130px;
`;

export const StatusRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 14px;
  color: #4b5563;
  padding: 10px;
  font-weight: 600;
`;

export const StatusGreen = styled.span`
  color: #16a34a;
`;

export const Title = styled.span`
  margin-top: 24px;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.4;
  word-break: keep-all;
`;

export const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 500;
`

export const Description = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

export const Point = styled.span`
  background-color: #85AAFF;
  color: white;
  font-weight: 600;
  font-size: 12px;
  padding: 5px;
  border-radius: 10px;
`;

export const Condition = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #5B5B5B;
  font-size: 12px;
`

export const Type = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  font-weight: 300;
`