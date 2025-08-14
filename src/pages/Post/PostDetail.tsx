import * as S from "styles/post/detail";

export default function PostDetail() {
  return (
    <S.RightContent>
      <S.PostHeader>
        <S.PostTitle>
          공지사항 제목 공지사항 제목 공지사항 제목 공지사항 제목
        </S.PostTitle>
        <S.PostMeta>
          <div>2025년 8월 14일</div>
          <div>300회</div>
        </S.PostMeta>
      </S.PostHeader>

      <S.PostBody>
        안녕하세요 오늘은 공지사항을 전달하기 위해서 이 글을 씁니다!!{'\n'}
        안녕하세요 오늘은 공지사항을 전달하기 위해서 이 글을 씁니다!!{'\n'}
        안녕하세요 오늘은 공지사항을 전달하기 위해서 이 글을 씁니다!!{'\n'}
        ...
        감사합니다~
      </S.PostBody>
    </S.RightContent>
  )
};