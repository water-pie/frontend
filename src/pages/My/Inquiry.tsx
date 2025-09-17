import { useState } from 'react';
import * as S from 'styles/my/inquiry';
import InquiryCard from 'components/My/InquiryCard';
import { useNavigate } from 'react-router-dom';

interface InquiryItem {
  id: number;
  title: string;
  date: string;
  status: '답변 중' | '답변 완료';
}

const mockInquiries: InquiryItem[] = [
  { id: 1, title: '문의사항 제목 문의사항 제목 문의사항 제목 문의사항 제목', date: '2025년 9월 2일', status: '답변 중' },
  { id: 2, title: '문의사항 제목 문의사항 제목 문의사항 제목 문의사항 제목', date: '2025년 9월 2일', status: '답변 완료' },
];

const Inquiry = () => {
  const [inquiries] = useState<InquiryItem[]>(mockInquiries);
  const navigate = useNavigate();

  const handleRegisterInquiry = () => {
    // alert('문의 등록 페이지로 이동');
    navigate('/my/inquiry/write');
  };

  return (
    <S.InquiryContainer>
      <S.Header>
        <S.Title>1:1 문의</S.Title>
        <S.RegisterButton onClick={handleRegisterInquiry}>문의 등록</S.RegisterButton>
      </S.Header>

      {inquiries.length === 0 ? (
        <S.NoInquiryMessage>작성한 문의가 없습니다.</S.NoInquiryMessage>
      ) : (
        <S.InquiryList>
          {inquiries.map((inquiry) => (
            <InquiryCard
              key={inquiry.id}
              id={inquiry.id}
              title={inquiry.title}
              date={inquiry.date}
              status={inquiry.status}
            />
          ))}
        </S.InquiryList>
      )}
    </S.InquiryContainer>
  );
};

export default Inquiry;