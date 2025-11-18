import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { getInfluencerListApi, getBrandManagerListApi, getMarketingAgencyListApi, approveUserApi, rejectUserApi, getApplicationUserListApi } from 'apis/user';
import { getUserPenalties, getUserPenaltyCount, deletePenalty } from 'apis/penalties';
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
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.5em;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const ModalInfo = styled.p`
  margin-bottom: 8px;
  line-height: 1.5;
  color: #555;
  strong {
    color: #333;
  }
  a {
    color: #007bff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  float: right;
  font-size: 1em;
  &:hover {
    background-color: #0056b3;
  }
`;

const PenaltyList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 15px;
  max-height: 300px;
  overflow-y: auto;
`;

const PenaltyItem = styled.li`
  background-color: #f9f9f9;
  border: 1px solid #eee;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #dc3545;
  color: white;
  font-size: 0.9em;

  &:hover {
    background-color: #c82333;
  }
`;

const UserDetailModal = ({ user, onClose }: { user: any, onClose: () => void }) => {
  if (!user) return null;

  const renderLink = (url: string | null, label: string) => (
    <ModalInfo><strong>{label}:</strong> {url ? <a href={url} target="_blank" rel="noopener noreferrer">{url}</a> : '없음'}</ModalInfo>
  );

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>사용자 상세 정보</ModalTitle>
        <ModalInfo><strong>ID:</strong> {user.id}</ModalInfo>
        <ModalInfo><strong>이름:</strong> {user.name}</ModalInfo>
        <ModalInfo><strong>이메일:</strong> {user.email}</ModalInfo>
        <ModalInfo><strong>전화번호:</strong> {user.phoneNumber}</ModalInfo>
        <ModalInfo><strong>유저 타입:</strong> {user.userType}</ModalInfo>
        {renderLink(user.blogUrl, '블로그')}
        {renderLink(user.instagramUrl, '인스타그램')}
        {renderLink(user.tiktokUrl, '틱톡')}
        {renderLink(user.youtubeUrl, '유튜브')}
        <ModalInfo><strong>가입일:</strong> {new Date(user.createdAt).toLocaleString()}</ModalInfo>
        <ModalInfo><strong>수정일:</strong> {new Date(user.updatedAt).toLocaleString()}</ModalInfo>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

const PenaltyModal = ({ user, onClose, token }: { user: any, onClose: () => void, token: string }) => {
  const [penalties, setPenalties] = useState<any[]>([]);
  const [penaltyCount, setPenaltyCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPenalties = async () => {
    if (!user || !token) return;
    setLoading(true);
    try {
      const [penaltiesResponse, countResponse] = await Promise.all([
        getUserPenalties(user.id, token),
        getUserPenaltyCount(user.id, token)
      ]);
      setPenalties(penaltiesResponse || []);
      setPenaltyCount(countResponse.count || 0);
    } catch (error) {
      console.error("Failed to fetch penalties:", error);
      alert("페널티 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPenalties();
  }, [user, token]);

  const handleDeletePenalty = async (penaltyId: number) => {
    if (!window.confirm("이 페널티를 정말로 취소하시겠습니까?")) return;

    try {
      await deletePenalty(penaltyId, token);
      alert("페널티가 성공적으로 취소되었습니다.");
      fetchPenalties(); // Refresh the list
    } catch (error) {
      console.error("Failed to delete penalty:", error);
      alert("페널티 취소에 실패했습니다.");
    }
  };

  if (!user) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>{user.name}님의 페널티 정보</ModalTitle>
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <>
            <ModalInfo><strong>총 페널티 횟수:</strong> {penaltyCount}회</ModalInfo>
            {penalties.length > 0 ? (
              <PenaltyList>
                {penalties.map(penalty => (
                  <PenaltyItem key={penalty.id}>
                    <div>
                      <ModalInfo><strong>사유:</strong> {penalty.reason}</ModalInfo>
                      <ModalInfo style={{ margin: 0 }}><strong>부과일:</strong> {new Date(penalty.createdAt).toLocaleString()}</ModalInfo>
                    </div>
                    <ActionButton onClick={() => handleDeletePenalty(penalty.id)}>취소</ActionButton>
                  </PenaltyItem>
                ))}
              </PenaltyList>
            ) : (
              <p>페널티 내역이 없습니다.</p>
            )}
          </>
        )}
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

const UserTable = ({ users, onShowDetails, onShowPenalties }: { users: any[], onShowDetails: (user: any) => void, onShowPenalties: (user: any) => void }) => {
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
                            <button onClick={() => onShowDetails(user)}>상세보기</button>
                            <button onClick={() => onShowPenalties(user)}>패널티 보기</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

const ApplicationTable = ({ applications, onApprove, onReject }: { applications: any[], onApprove: (userId: number) => void, onReject: (userId: number) => void }) => {
  if (!applications || applications.length === 0) {
      return <p>표시할 신청이 없습니다.</p>;
  }
  return (
      <Table>
          <thead>
              <tr>
                  <th>유저 이름</th>
                  <th>신청 역할</th>
                  <th>사업자 등록 번호</th>
                  <th>사업자 등록증 이미지</th>
                  <th>승인 여부</th>
              </tr>
          </thead>
          <tbody>
              {applications.map(app => (
                  <tr key={app.id}>
                      <td>{app.name}</td>
                      <td>{app.role}</td>
                      <td>{app.businessNumber}</td>
                      <td><a href={app.businessLicenseImage} target="_blank" rel="noopener noreferrer">이미지 보기</a></td>
                      <td>
                          <button onClick={() => onApprove(app.id)}>승인</button>
                          <button onClick={() => onReject(app.id)}>거절</button>
                      </td>
                  </tr>
              ))}
          </tbody>
      </Table>
  );
};

export default function UserManagement() {
  const [activeMainTab, setActiveMainTab] = useState('influencer');
  const [users, setUsers] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedUserForPenalty, setSelectedUserForPenalty] = useState<any | null>(null);
  const [isPenaltyModalOpen, setIsPenaltyModalOpen] = useState(false);
  const { userInfo } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      if (!userInfo?.token) return;

      setLoading(true);
      setUsers([]);
      setApplications([]);

      try {
        if (activeMainTab === 'influencer') {
          const response = await getInfluencerListApi(userInfo.token);
          setUsers(response || []);
        } else if (activeMainTab === 'brand') {
          const response = await getBrandManagerListApi(userInfo.token);
          setUsers(response || []);
        } else if (activeMainTab === 'marketing') {
          const response = await getMarketingAgencyListApi(userInfo.token);
          setUsers(response || []);
        } else if (activeMainTab === 'application') {
          const response = await getApplicationUserListApi(userInfo.token);
          setApplications(response || []);
        }
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeMainTab, userInfo?.token]);

  const handleShowDetails = (user: any) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedUser(null);
  };

  const handleShowPenalties = (user: any) => {
    setSelectedUserForPenalty(user);
    setIsPenaltyModalOpen(true);
  };

  const handleClosePenaltyModal = () => {
    setIsPenaltyModalOpen(false);
    setSelectedUserForPenalty(null);
  };

  const handleApproveUser = async (userId: number) => {
    if (!userInfo?.token) return;
    if (window.confirm(`사용자 ID ${userId}를 승인하시겠습니까?`)) {
      try {
        await approveUserApi(userInfo.token, userId);
        alert('성공적으로 승인되었습니다.');
        setApplications(prev => prev.filter(app => app.id !== userId));
      } catch (error) {
        console.error('승인 처리 중 오류가 발생했습니다:', error);
        alert('승인 처리에 실패했습니다.');
      }
    }
  };

  const handleRejectUser = async (userId: number) => {
    if (!userInfo?.token) return;
    if (window.confirm(`사용자 ID ${userId}를 거절하시겠습니까?`)) {
      try {
        await rejectUserApi(userInfo.token, userId);
        alert('성공적으로 거절되었습니다.');
        setApplications(prev => prev.filter(app => app.id !== userId));
      } catch (error) {
        console.error('거절 처리 중 오류가 발생했습니다:', error);
        alert('거절 처리에 실패했습니다.');
      }
    }
  };

  return (
    <div>
      <h2>사용자 관리</h2>
      <Tabs>
        <TabButton onClick={() => setActiveMainTab('influencer')} active={activeMainTab === 'influencer'}>인플루언서</TabButton>
        <TabButton onClick={() => setActiveMainTab('brand')} active={activeMainTab === 'brand'}>브랜드 담당자</TabButton>
        <TabButton onClick={() => setActiveMainTab('marketing')} active={activeMainTab === 'marketing'}>마케팅 대행사</TabButton>
        <TabButton onClick={() => setActiveMainTab('application')} active={activeMainTab === 'application'}>신청 관리</TabButton>
      </Tabs>

      {loading ? <p>목록을 불러오는 중...</p> : (
        <>
          {activeMainTab === 'application' 
            ? <ApplicationTable 
                applications={applications} 
                onApprove={handleApproveUser} 
                onReject={handleRejectUser} 
              />
            : <UserTable users={users} onShowDetails={handleShowDetails} onShowPenalties={handleShowPenalties} />
          }
        </>
      )}

      {isDetailModalOpen && selectedUser && (
        <UserDetailModal user={selectedUser} onClose={handleCloseDetailModal} />
      )}

      {isPenaltyModalOpen && selectedUserForPenalty && userInfo?.token && (
        <PenaltyModal user={selectedUserForPenalty} onClose={handleClosePenaltyModal} token={userInfo.token} />
      )}
    </div>
  );
}
