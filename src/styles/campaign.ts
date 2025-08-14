import styled from "@emotion/styled";

export const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 400px;
  gap: 10px;
`;

export const ImageCard = styled.div`
  border-radius: 5px;
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 5px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px;
  gap: 12px;
`;

export const Top = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4px;

  img {
    width: 22px;
    height: 22px;
  }
`

export const Limit = styled.span`
  font-size: 16px;
  font-weight: 700;
`

export const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
`

export const Description = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #888;
`

export const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
`

export const LimitStatus = styled.span`
  font-weight: 400;
  color: #888;
`