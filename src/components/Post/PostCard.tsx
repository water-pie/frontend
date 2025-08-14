import * as S from "styles/post/postCard"

interface Props {
  id: number,
  title: string,
  createdAt: string,
  watch: number
}

export const PostCard = ({ id, title, createdAt, watch }: Props) => {
  return (
    <S.Container to={`/notices/${id}`}>
      <S.Title>{title}</S.Title>
      <S.Info>
        <S.Created>{createdAt}</S.Created>
        <S.Watch>{watch}회</S.Watch>
      </S.Info>
    </S.Container>
  )
};

export default PostCard;