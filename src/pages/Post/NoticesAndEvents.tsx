import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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

const POSTS_PER_PAGE = 10;

export default function NoticesAndEvents() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchParams] = useSearchParams();
  const typeFilter = searchParams.get("type") || "notice";
  const [currentPage, setCurrentPage] = useState(1);

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

        const filteredPosts = combinedPosts.filter(post => post.type === typeFilter);

        setPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [typeFilter]);

  // Pagination logic
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PageButton key={i} onClick={() => handlePageChange(i)} selected={i === currentPage}>
          {i}
        </PageButton>
      );
    }
    return pageNumbers;
  };

  return (
    <S.RightContent>
      {posts.length === 0 ? (
        <S.NoPostsMessage>게시글이 없습니다.</S.NoPostsMessage>
      ) : (
        <>
          {currentPosts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              type={post.type}
              title={post.title}
              createdAt={post.createdAt}
              watch={0} // API에 watch count가 없어서 0으로 고정
            />
          ))}
          {posts.length >= POSTS_PER_PAGE && (
            <Pagination>
              <PageButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                {"<"}
              </PageButton>
              {renderPageNumbers()}
              <PageButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                {">"}
              </PageButton>
            </Pagination>
          )}
        </>
      )}
    </S.RightContent>
  );
}

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
`

export const PageButton = styled.button<{ selected?: boolean }>`
  min-width: 35px;
  min-height: 35px;
  font-weight: ${({ selected }) => (selected ? "700" : "400")};
  font-size: 16px;
  background-color: white;
  border: none;
  color: ${({ selected }) => (selected ? "#007bff" : "black")};
  cursor: pointer;

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`