import { Outlet, useSearchParams } from "react-router-dom";
import * as S from "styles/post/post";

export const PostLayout = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "notice"; // Default to 'notice'

  return (
    <S.NoticeContainer>
      <S.LeftContent>
        <h2>공지 / 이벤트</h2>
        <S.ClassificationBox>
          <S.Classification
            to="/post?type=notice"
            selected={type === "notice"}
          >
            공지사항
          </S.Classification>
          <S.Classification
            to="/post?type=event"
            selected={type === "event"}
          >
            이벤트
          </S.Classification>
        </S.ClassificationBox>
      </S.LeftContent>
      <Outlet />
    </S.NoticeContainer>
  )
};

export default PostLayout;