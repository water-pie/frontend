import { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { getAllInquiries, getInquiryByIdForAdmin, addInquiryAnswer } from 'apis/inquires';
import useUserStore from 'store/useUserStore';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
`;

const Button = styled.button`
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  cursor: pointer;
`;

const Status = styled.span<{ answered: boolean }>`
  color: ${props => props.answered ? 'blue' : 'red'};
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 600px;
  max-width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.h2`
  margin-top: 0;
`;

const InquiryContent = styled.div`
  border: 1px solid #eee;
  background-color: #f9f9f9;
  padding: 15px;
  margin: 15px 0;
  border-radius: 5px;
  white-space: pre-wrap;
`;

const AnswerTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  min-height: 150px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const ModalActions = styled.div`
  text-align: right;
  margin-top: 20px;
  & > button {
    margin-left: 10px;
  }
`;

const InquiryAnswerModal = ({ inquiryId, token, onClose, onAnswered }: { inquiryId: number, token: string, onClose: () => void, onAnswered: () => void }) => {
  const [inquiry, setInquiry] = useState<any>(null);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchInquiry = async () => {
      setLoading(true);
      try {
        const response = await getInquiryByIdForAdmin(inquiryId, token);
        setInquiry(response);
        setAnswer(response?.answer || '');
      } catch (error) {
        console.error("Failed to fetch inquiry details:", error);
        alert("문의 상세 정보를 불러오는데 실패했습니다.");
        onClose();
      } finally {
        setLoading(false);
      }
    };
    fetchInquiry();
  }, [inquiryId, token, onClose]);

  const handleSaveAnswer = async () => {
    if (!answer.trim()) {
      alert("답변 내용을 입력해주세요.");
      return;
    }
    setSaving(true);
    try {
      await addInquiryAnswer(inquiryId, answer, token);
      alert("답변이 성공적으로 저장되었습니다.");
      onAnswered();
      onClose();
    } catch (error) {
      console.error("Failed to save answer:", error);
      alert("답변 저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>문의 답변</ModalHeader>
        {loading ? (
          <p>로딩 중...</p>
        ) : inquiry ? (
          <div>
            <h3>{inquiry.title}</h3>
            <p><strong>작성자ID :</strong> {inquiry.authorId || '알 수 없음'}</p>
            <p><strong>작성일:</strong> {new Date(inquiry.createdAt).toLocaleString()}</p>
            <InquiryContent>{inquiry.content}</InquiryContent>
            <AnswerTextarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="답변을 입력하세요..."
              disabled={saving}
            />
          </div>
        ) : (
          <p>문의 정보를 불러올 수 없습니다.</p>
        )}
        <ModalActions>
          <Button onClick={onClose} disabled={saving}>취소</Button>
          <Button onClick={handleSaveAnswer} disabled={loading || saving}>
            {saving ? '저장 중...' : '답변 저장'}
          </Button>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

const InquiryTable = ({ inquiries, onAnswerClick }: { inquiries: any[], onAnswerClick: (id: number) => void }) => {
    if (!inquiries || inquiries.length === 0) {
        return <p>문의가 없습니다.</p>;
    }
    return (
        <Table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>제목</th>
                    <th>작성자ID</th>
                    <th>상태</th>
                    <th>작성일</th>
                    <th>작업</th>
                </tr>
            </thead>
            <tbody>
                {inquiries.map(inquiry => (
                    <tr key={inquiry.id}>
                        <td>{inquiry.id}</td>
                        <td>{inquiry.title}</td>
                        <td>{inquiry.authorId || '-'}</td>
                        <td><Status answered={!!inquiry.answer}>{inquiry.answer ? '답변 완료' : '대기중'}</Status></td>
                        <td>{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                        <td>
                            <Button onClick={() => onAnswerClick(inquiry.id)}>답변하기</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default function InquiryManagement() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInquiryId, setSelectedInquiryId] = useState<number | null>(null);
  const { userInfo } = useUserStore();

  const fetchInquiries = useCallback(async () => {
    if (!userInfo?.token) return;
    setLoading(true);
    try {
      const response = await getAllInquiries(userInfo.token);
      if (response && response.data && Array.isArray(response.data)) {
        setInquiries(response.data);
      } else {
        setInquiries([]);
      }
    } catch (error) {
      console.error("문의 목록을 불러오는데 실패했습니다:", error);
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  }, [userInfo?.token]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleAnswerClick = (id: number) => {
    setSelectedInquiryId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedInquiryId(null);
    setIsModalOpen(false);
  };

  const handleAnswered = () => {
    fetchInquiries();
  };

  return (
    <div>
      <h2>문의 관리</h2>
      {loading ? <p>문의 목록을 불러오는 중...</p> : <InquiryTable inquiries={inquiries} onAnswerClick={handleAnswerClick} />}
      
      {isModalOpen && selectedInquiryId && userInfo?.token && (
        <InquiryAnswerModal
          inquiryId={selectedInquiryId}
          token={userInfo.token}
          onClose={handleCloseModal}
          onAnswered={handleAnswered}
        />
      )}
    </div>
  );
}
