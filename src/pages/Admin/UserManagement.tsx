import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { getInfluencerListApi, getBrandManagerListApi, getMarketingAgencyListApi } from 'apis/user';
import useUserStore from 'store/useUserStore';

const Tabs = styled.div`
  margin-bottom: 20px;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  border: 1px solid #ccc;
  background-color: ${props => props.active ? '#e0e0e0' : '#fff'};
  cursor: pointer;
  &:not(:last-child) {
    border-right: none;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
`;

const UserTable = ({ users }: { users: any[] }) => {
    if (!users || users.length === 0) {
        return <p>표시할 사용자가 없습니다.</p>;
    }
    return (
        <Table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>이름</th>
                    <th>이메일</th>
                    <th>전화번호</th>
                    <th>작업</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber}</td>
                        <td>
                            <button>상세보기</button>
                            <button>페널티 관리</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};


export default function UserManagement() {
  const [activeTab, setActiveTab] = useState('influencer');
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useUserStore();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!userInfo?.token) return;

      setLoading(true);
      try {
        let response;
        if (activeTab === 'influencer') {
          response = await getInfluencerListApi(userInfo.token);
        } else if (activeTab === 'brand') {
          response = await getBrandManagerListApi(userInfo.token);
        } else {
          response = await getMarketingAgencyListApi(userInfo.token);
        }
        setUsers(response || []);
      } catch (error) {
        console.error("사용자 목록을 불러오는데 실패했습니다:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [activeTab]);

  return (
    <div>
      <h2>사용자 관리</h2>
      <Tabs>
        <TabButton onClick={() => setActiveTab('influencer')} active={activeTab === 'influencer'}>인플루언서</TabButton>
        <TabButton onClick={() => setActiveTab('brand')} active={activeTab === 'brand'}>브랜드 담당자</TabButton>
        <TabButton onClick={() => setActiveTab('marketing')} active={activeTab === 'marketing'}>마케팅 대행사</TabButton>
      </Tabs>
      {loading ? <p>사용자 목록을 불러오는 중...</p> : <UserTable users={users} />}
    </div>
  );
}
