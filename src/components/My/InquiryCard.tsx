
import * as S from 'styles/my/inquiryCard'; // Will create this file

interface InquiryCardProps {
  id: number;
  title: string;
  date: string;
  status: '답변 됨' | '답변 완료'; // Assuming these are the two statuses
}

const InquiryCard = ({ id, title, date, status }: InquiryCardProps) => {
  return (
    <S.Container to={`/my/inquiry/${id}`}> {/* Assuming a detail page for inquiry */}
      <S.Title>{title}</S.Title>
      <S.Info>
        <S.Date>{date}</S.Date>
        <S.Status status={status}>{status}</S.Status>
      </S.Info>
    </S.Container>
  );
};

export default InquiryCard;
