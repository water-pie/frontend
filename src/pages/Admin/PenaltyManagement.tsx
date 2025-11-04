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

const Button = styled.button`
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  cursor: pointer;
`;

interface Penalty {
  id: number;
  userId: number;
  reason: string;
  startDate: string;
  endDate: string;
}

const PenaltyTable = ({ penalties }: { penalties: Penalty[] }) => {
    if (!penalties || penalties.length === 0) {
        return <p>패널티 내역이 없습니다.</p>;
    }
    return (
        <Table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>사용자 ID</th>
                    <th>패널티 내용</th>
                    <th>부여일</th>
                    <th>만료일</th>
                    <th>작업</th>
                </tr>
            </thead>
            <tbody>
                {penalties.map(penalty => (
                    <tr key={penalty.id}>
                        <td>{penalty.id}</td>
                        <td>{penalty.userId}</td>
                        <td>{penalty.reason}</td>
                        <td>{penalty.startDate}</td>
                        <td>{penalty.endDate}</td>
                        <td>
                            <Button>관리</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default function PenaltyManagement() {
  const [penalties, setPenalties] = useState<Penalty[]>([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useUserStore();

  useEffect(() => {
    const fetchPenalties = async () => {
      if (!userInfo?.token) return;
      setLoading(true);
      try {
        // This is a placeholder. In a real scenario, we'd have an admin API to get all penalties.
        // For now, we'll mock some data or use an existing API if suitable.
        // const response = await getAdminAllPenaltiesApi(userInfo.token);
        // setPenalties(response.data || []);

        // Mock data for demonstration
        setPenalties([
          { id: 1, userId: 101, reason: "부적절한 콘텐츠 게시", startDate: "2023-10-26", endDate: "2023-11-26" },
          { id: 2, userId: 102, reason: "광고성 게시물 도배", startDate: "2023-10-20", endDate: "2023-11-20" },
        ]);

      } catch (error) {
        console.error("패널티 목록을 불러오는데 실패했습니다:", error);
        setPenalties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPenalties();
  }, [userInfo?.token]);

  return (
    <div>
      <h2>패널티 관리</h2>
      {loading ? <p>패널티 목록을 불러오는 중...</p> : <PenaltyTable penalties={penalties} />}
    </div>
  );
}
