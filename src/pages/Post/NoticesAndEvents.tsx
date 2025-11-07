import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEventListApi } from "apis/event";
import { getNoticeListApi } from "apis/notice";
import PostCard from "components/Post/PostCard";
import * as S from "styles/post/post";

interface Post {
  id: number;
  title: string;
  createdAt: string;
  type: "notice" | "event";
}

export default function NoticesAndEvents() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [noticesRes, eventsRes] = await Promise.all([
          getNoticeListApi(),
          getEventListApi(),
        ]);

        const notices = noticesRes.data.map((item) => ({
          ...item,
          type: "notice" as const,
          createdAt: item.create_at,
        }));

        const events = eventsRes.data.map((item) => ({
          ...item,
          type: "event" as const,
          createdAt: item.create_at,
        }));

        const combinedPosts = [...notices, ...events].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setPosts(combinedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <S.RightContent>
      {posts.map((post) => (
        <Link to={`/post/${post.type}/${post.id}`} key={post.id}>
          <PostCard
            id={post.id}
            title={post.title}
            createdAt={post.createdAt}
            watch={0} // API에 watch count가 없어서 0으로 고정
          />
        </Link>
      ))}
      <Pagination>
        <PageButton>{"<"}</PageButton>
        <PageButton>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>3</PageButton>
        <PageButton>{">"}</PageButton>
      </Pagination>
    </S.RightContent>
  );
}

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