import * as S from "styles/campaign"

interface Props {
  image: string,
  title: string,
  description: string;
  status: number,
  limit: number,
  remainingDays: number,
  type: string,
}

const ProductCard = ({
  image, title, description, limit, remainingDays, type, status
}: Props) => {
  return (
    <S.Card>
      <S.Image src={image} alt={title} />
      <S.Content>
        <S.Top>
          <img src={type} alt={title} />
          <S.Limit>{remainingDays}일 남음</S.Limit>
        </S.Top>
        <S.DescriptionBox>
          <S.Title>{title}</S.Title>
          <S.Description>{description}</S.Description>
        </S.DescriptionBox>
        <S.Status>
          <span>신청 {status}명</span>
          <S.LimitStatus>/</S.LimitStatus>
          <S.LimitStatus>모집 {limit}명</S.LimitStatus>
        </S.Status>
      </S.Content>
    </S.Card>
  );
};

export default ProductCard;