import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNoticeDetailApi } from "apis/notice";
import { getEventDetailApi } from "apis/event";
import * as S from "styles/post/detail";

interface PostDetailData {
  title: string;
  content: string;
  createdAt: string;
}

export default function PostDetail() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [post, setPost] = useState<PostDetailData | null>(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!type || !id) return;

      try {
        let response;
        if (type === "notice") {
          response = await getNoticeDetailApi(Number(id));
        } else if (type === "event") {
          response = await getEventDetailApi(Number(id));
        }

        if (response) {
          setPost({
            title: response.data.title,
            content: response.data.content,
            createdAt: response.data.create_at,
          });
        }
      } catch (error) {
        console.error("Error fetching post detail:", error);
      }
    };

    fetchPostDetail();
  }, [type, id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <S.RightContent>
      <S.PostHeader>
        <S.PostTitle>{post.title}</S.PostTitle>
        <S.PostMeta>
          <div>{new Date(post.createdAt).toLocaleDateString()}</div>
        </S.PostMeta>
      </S.PostHeader>

      <S.PostBody>{post.content}</S.PostBody>
    </S.RightContent>
  );
}