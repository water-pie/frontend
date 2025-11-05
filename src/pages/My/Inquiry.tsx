import { useState, useEffect } from 'react';
import * as S from 'styles/my/inquiry';
import InquiryCard from 'components/My/InquiryCard';
import { useNavigate } from 'react-router-dom';
import { getMyInquiries } from 'apis/inquires';
import useUserStore from 'store/useUserStore';

interface ApiInquiryItem {
  id: number;
  title: string;
  created_at: string;
  status: number; // Assuming 0 for '답변 중', 1 for '답변 완료'
}

const Inquiry = () => {
  const [inquiries, setInquiries] = useState<ApiInquiryItem[]>([]);
  const navigate = useNavigate();
  const { userInfo } = useUserStore();

  const fetchInquiries = async () => {
    if (!userInfo?.token) return;
    try {
      const response = await getMyInquiries(userInfo.token);
      if (response.status === "success" && response.data) {
        setInquiries(response.data);
      } else {
        setInquiries([]);
      }
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
      setInquiries([]);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [userInfo?.token]);

  const handleRegisterInquiry = () => {
    navigate('/my/inquiry/write');
  };

  const getStatusText = (status: number) => {
    return status === 0 ? '답변 중' : '답변 완료';
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
              date={new Date(inquiry.created_at).toLocaleDateString('ko-KR')}
              status={getStatusText(inquiry.status)}
            />
          ))}
        </S.InquiryList>
      )}
    </S.InquiryContainer>
  );
};

export default Inquiry;