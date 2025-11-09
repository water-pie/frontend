import * as S from "styles/post/postCard"

interface Props {
  id: number,
  type: string,
  title: string,
  createdAt: string,
  watch: number
}

export const PostCard = ({ id, type, title, createdAt, watch }: Props) => {
  return (
    <S.Container to={`/post/${type}/${id}`}>
      <S.Title>{title}</S.Title>
      <S.Info>
        <S.Created>{createdAt}</S.Created>
        <S.Watch>{watch}회</S.Watch>
      </S.Info>
    </S.Container>
  )
};

export default PostCard;