import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import useUserStore from 'store/useUserStore';
import { getWithdrawals, getPointTransactions } from 'apis/points';

const Tabs = styled.div`
  margin-bottom: 20px;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  border: 1px solid #ccc;
  background-color: ${props => (props.active ? '#e0e0e0' : '#fff')};
  cursor: pointer;
  &:not(:last-child) {
    border-right: none;
  }
`;

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

const getTransactionType = (status: string) => {
  const depositStatuses = ["PENDING", "DONE", "FAILED"]; 
  const withdrawalStatuses = ["APPROVED", "REJECTED", "PROCESSING", "COMPLETED"];

  if (depositStatuses.includes(status)) return "충전";
  if (withdrawalStatuses.includes(status)) return "출금";
  return "기타";
};

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
          <th>상태</th>
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
        {history.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.userId}</td>
            <td>{getTransactionType(item.status)}</td>
            <td>{item.amount.toLocaleString()}</td>
            <td>{item.status}</td>
            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default function PointManagement() {
  const { userInfo } = useUserStore();

  const [activeTab, setActiveTab] = useState<'withdrawals' | 'transactions'>('withdrawals');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPointData = async () => {
      if (!userInfo?.token) return;
      setLoading(true);

      try {
        let response;

        if (activeTab === 'withdrawals') {
          response = await getWithdrawals(userInfo.token);
        } else if (activeTab === 'transactions') {
          response = await getPointTransactions(userInfo.token);
        }

        setData(response?.data || []);
      } catch (error) {
        console.error("포인트 데이터를 불러오는데 실패했습니다:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPointData();
  }, [activeTab, userInfo?.token]);

  return (
    <div>
      <h2>포인트 관리</h2>

      <Tabs>
        <TabButton active={activeTab === 'withdrawals'} onClick={() => setActiveTab('withdrawals')}>
          출금 요청 목록
        </TabButton>
        <TabButton active={activeTab === 'transactions'} onClick={() => setActiveTab('transactions')}>
          포인트 트랜잭션
        </TabButton>
      </Tabs>

      {loading ? (
        <p>불러오는 중...</p>
      ) : (
        <PointHistoryTable history={data} />
      )}
    </div>
  );
}
