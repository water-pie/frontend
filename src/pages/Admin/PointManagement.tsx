import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import useUserStore from '../../store/useUserStore';

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

const PointHistoryTable = ({ history }: { history: any[] }) => {
    if (!history || history.length === 0) {
        return <p>포인트 내역이 없습니다.</p>;
    }
    return (
        <Table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>사용자 ID</th>
                    <th>유형</th>
                    <th>금액</th>
                    <th>날짜</th>
                </tr>
            </thead>
            <tbody>
                {history.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.userId}</td>
                        <td>{item.type === 'deposit' ? '충전' : '출금'}</td>
                        <td>{item.amount.toLocaleString()}</td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default function PointManagement() {
  const [pointHistory, setPointHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useUserStore();

  useEffect(() => {
    const fetchPointHistory = async () => {
      if (!userInfo?.token) return;
      setLoading(true);
      try {
        // const response = await getAdminPointHistoryApi(userInfo.token);
        // todo
        setPointHistory([]);
      } catch (error) {
        console.error("포인트 내역을 불러오는데 실패했습니다:", error);
        setPointHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPointHistory();
  }, [userInfo?.token]);

  return (
    <div>
      <h2>포인트 관리</h2>
      {loading ? <p>포인트 내역을 불러오는 중...</p> : <PointHistoryTable history={pointHistory} />}
    </div>
  );
}
