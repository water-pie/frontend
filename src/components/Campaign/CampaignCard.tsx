import * as S from "styles/campaign"

interface Props {
  image: string,
  title: string,
  status: number,
  limit: number,
  remainingDays: number,
  point: number,
  type: string,
  condition: string
}

const ProductCard = ({
  image, title, status, limit, remainingDays, point, type, condition
}: Props) => {
  return (
    <S.Card>
      <S.ImageCard>
        <S.Image src={image} alt={title} />
        <S.StatusRow>
          <span>신청 {(remainingDays !== 0) ? <S.StatusGreen>{status}</S.StatusGreen> : <span>{status}</span>} / {limit}</span>
          {remainingDays !== 0 ? (
            <span>
              <S.StatusGreen>{remainingDays}</S.StatusGreen>일 남음
            </span>
          ) : (
            <span>마감</span>
          )}
        </S.StatusRow>
      </S.ImageCard>
      <S.Content>
        <S.Title>{title}</S.Title>
        <S.DescriptionBox>
          <S.Description>
            에어 매트리스 제공 및 실사용 가능
          </S.Description>
          <S.Condition>
            <S.Type>
              <img src={type} alt={"로고"}/>
              {condition}
            </S.Type>
            <S.Point>{point.toLocaleString()}P</S.Point>
          </S.Condition>
        </S.DescriptionBox>
      </S.Content>
    </S.Card>
  );
};

export default ProductCard;