
import { useParams } from 'react-router-dom';
import * as S from 'styles/my/inquiryDetail';

interface InquiryDetailItem {
  id: number;
  title: string;
  date: string;
  status: '답변 됨' | '답변 완료';
  content: string;
  answer: string;
}

const mockInquiryDetail: InquiryDetailItem = {
  id: 1,
  title: '문의사항 제목 문의사항 제목 문의사항 제목 문의사항 제목',
  date: '2025년 8월 14일',
  status: '답변 완료',
  content: `안녕하세요. 문의하고 싶은 내용이 있어 1:1 문의를 신청했습니다.
안녕하세요. 문의하고 싶은 내용이 있어 1:1 문의를 신청했습니다.
안녕하세요. 문의하고 싶은 내용이 있어 1:1 문의를 신청했습니다.
안녕하세요. 문의하고 싶은 내용이 있어 1:1 문의를 신청했습니다.
안녕하세요. 문의하고 싶은 내용이 있어 1:1 문의를 신청했습니다.
안녕하세요. 문의하고 싶은 내용이 있어 1:1 문의를 신청했습니다.
안녕하세요. 문의하고 싶은 내용이 있어 1:1 문의를 신청했습니다.
안녕하세요. 문의하고 싶은 내용이 있어 1:1 문의를 신청했습니다.`,
  answer: `안녕하세요, 고객님~! 문의하신 내용에 대해 답변을 드리겠습니다!
안녕하세요, 고객님~! 문의하신 내용에 대해 답변을 드리겠습니다!
안녕하세요, 고객님~! 문의하신 내용에 대해 답변을 드리겠습니다!
안녕하세요, 고객님~! 문의하신 내용에 대해 답변을 드리겠습니다!
안녕하세요, 고객님~! 문의하신 내용에 대해 답변을 드리겠습니다!
안녕하세요, 고객님~! 문의하신 내용에 대해 답변을 드리겠습니다!
안녕하세요, 고객님~! 문의하신 내용에 대해 답변을 드리겠습니다!
안녕하세요, 고객님~! 문의하신 내용에 대해 답변을 드리겠습니다!`,
};

const InquiryDetail = () => {
  const { id } = useParams();

  const inquiry = mockInquiryDetail;

  if (!inquiry) {
    return <S.InquiryDetailContainer>문의를 찾을 수 없습니다.</S.InquiryDetailContainer>;
  }

  return (
    <S.InquiryDetailContainer>
      <S.Header>
        <S.Title>{inquiry.title}</S.Title>
        <S.Meta>
          <S.Date>{inquiry.date}</S.Date>
          <S.Status status={inquiry.status}>{inquiry.status}</S.Status>
        </S.Meta>
      </S.Header>

      <S.ContentSection>
        <S.ContentText>{inquiry.content}</S.ContentText>
      </S.ContentSection>

      <S.AnswerSection>
        <S.AnswerTitle>답변</S.AnswerTitle>
        <S.AnswerText>{inquiry.answer}</S.AnswerText>
      </S.AnswerSection>
    </S.InquiryDetailContainer>
  );
};

export default InquiryDetail;