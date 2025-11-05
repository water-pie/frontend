
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as S from 'styles/my/inquiryDetail';
import { getInquiryById, deleteInquiry } from 'apis/inquires';
import useUserStore from 'store/useUserStore';

interface InquiryDetailItem {
  id: number;
  title: string;
  created_at: string;
  status: number; // Assuming 0 for '답변 중', 1 for '답변 완료'
  content: string;
  answer: string | null;
}

const InquiryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  const [inquiryDetail, setInquiryDetail] = useState<InquiryDetailItem | null>(null);

  useEffect(() => {
    const fetchInquiryDetail = async () => {
      if (!id || !userInfo?.token) return;
      try {
        const response = await getInquiryById(Number(id), userInfo.token);
        if (response.status === "success" && response.data) {
          setInquiryDetail(response.data);
        } else {
          setInquiryDetail(null);
        }
      } catch (error) {
        console.error("Failed to fetch inquiry detail:", error);
        setInquiryDetail(null);
      }
    };

    fetchInquiryDetail();
  }, [id, userInfo?.token]);

  const handleEditInquiry = () => {
    if (inquiryDetail) {
      navigate(`/my/inquiry/write`, { state: { inquiry: inquiryDetail } });
    }
  };

  const handleDeleteInquiry = async () => {
    if (!id || !userInfo?.token) {
      alert("로그인이 필요하거나 문의 ID를 찾을 수 없습니다.");
      return;
    }
    if (window.confirm("정말로 이 문의를 삭제하시겠습니까?")) {
      try {
        const response = await deleteInquiry(Number(id), userInfo.token);
        if (response.status === "success") {
          alert("문의가 성공적으로 삭제되었습니다.");
          navigate('/my/inquiry'); // Navigate back to the inquiry list
        } else {
          alert(`문의 삭제 실패: ${response.message}`);
        }
      } catch (error) {
        console.error("문의 삭제 중 오류 발생:", error);
        alert("문의 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  if (!inquiryDetail) {
    return <S.InquiryDetailContainer>문의를 찾을 수 없거나 로딩 중입니다.</S.InquiryDetailContainer>;
  }

  const getStatusText = (status: number) => {
    return status === 0 ? '답변 중' : '답변 완료';
  };

  return (
    <S.InquiryDetailContainer>
      <S.Header>
        <S.Title>{inquiryDetail.title}</S.Title>
        <S.Meta>
          <S.Date>{new Date(inquiryDetail.created_at).toLocaleDateString('ko-KR')}</S.Date>
          <S.Status status={getStatusText(inquiryDetail.status)}>{getStatusText(inquiryDetail.status)}</S.Status>
          {inquiryDetail.status === 0 && ( // Only show edit/delete buttons if status is '답변 중'
            <>
              <S.EditButton onClick={handleEditInquiry}>수정</S.EditButton>
              <S.DeleteButton onClick={handleDeleteInquiry}>삭제</S.DeleteButton>
            </>
          )}
        </S.Meta>
      </S.Header>

      <S.ContentSection>
        <S.ContentText>{inquiryDetail.content}</S.ContentText>
      </S.ContentSection>

      {inquiryDetail.answer && (
        <S.AnswerSection>
          <S.AnswerTitle>답변</S.AnswerTitle>
          <S.AnswerText>{inquiryDetail.answer}</S.AnswerText>
        </S.AnswerSection>
      )}
    </S.InquiryDetailContainer>
  );
};

export default InquiryDetail;