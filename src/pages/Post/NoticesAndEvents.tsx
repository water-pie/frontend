import styled from "@emotion/styled";
import PostCard from "components/Post/PostCard";
import { posts } from "mocks/post";
import * as S from "styles/post/post";

export default function NoticesAndEvents() {
  // 페이지네이션 추가

  return (
    <S.RightContent>
        {posts.map(post => {
          return (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              createdAt={post.createdAt}
              watch={post.watch}
            />
          )
        })}
        <Pagination>
          <PageButton>{"<"}</PageButton>
          <PageButton>1</PageButton>
          <PageButton>2</PageButton>
          <PageButton>3</PageButton>
          <PageButton>{">"}</PageButton>
        </Pagination>
      </S.RightContent>
  )
};

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
`

export const PageButton = styled.button`
  min-width: 35px;
  min-height: 35px;
  font-weight: 400;
  font-size: 16px;
  background-color: white;
  border: none;
`