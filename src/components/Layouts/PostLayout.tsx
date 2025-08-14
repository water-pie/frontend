import { useState } from "react";
import { Outlet } from "react-router-dom";
import * as S from "styles/post/post";

export const PostLayout = () => {
  const [isSelect, setIsSelect] = useState<"notice" | "event">("notice");

  return (
    <S.NoticeContainer>
      <S.LeftContent>
        <h2>공지 / 이벤트</h2>
        <S.ClassificationBox>
          <S.Classification
            to="/notices"
            onClick={() => setIsSelect("notice")}
            selected={isSelect == "notice"}
          >
            공지사항
          </S.Classification>
          <S.Classification
            to="/notices"
            onClick={() => setIsSelect("event")} 
            selected={isSelect == "event"}
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