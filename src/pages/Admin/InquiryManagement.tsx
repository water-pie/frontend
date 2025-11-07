import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { getAllInquiries } from 'apis/inquires';
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

const InquiryTable = ({ inquiries }: { inquiries: any[] }) => {
    if (!inquiries || inquiries.length === 0) {
        return <p>문의가 없습니다.</p>;
    }
    return (
        <Table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>제목</th>
                    <th>작성자</th>
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
                        <td>{inquiry.user?.name || '-'}</td>
                        <td><Status answered={!!inquiry.answer}>{inquiry.answer ? '답변 완료' : '대기중'}</Status></td>
                        <td>{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                        <td>
                            <Button>답변하기</Button>
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
  const { userInfo } = useUserStore();

  useEffect(() => {
    const fetchInquiries = async () => {
      if (!userInfo?.token) return;
      setLoading(true);
      try {
        const response = await getAllInquiries(userInfo.token);
        setInquiries(response.data || []);
      } catch (error) {
        console.error("문의 목록을 불러오는데 실패했습니다:", error);
        setInquiries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [userInfo?.token]);

  return (
    <div>
      <h2>문의 관리</h2>
      {loading ? <p>문의 목록을 불러오는 중...</p> : <InquiryTable inquiries={inquiries} />}
    </div>
  );
}
