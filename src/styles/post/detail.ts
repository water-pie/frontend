import styled from "@emotion/styled";

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 20px;
  width: 900px;
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
`;

export const PostTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
  flex: 1;
`;

export const PostMeta = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 14px;
  color: #888;
  gap: 20px;
`;

export const PostBody = styled.div`
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-line;
`;
