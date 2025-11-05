import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { getNoticeListApi, deleteNoticeApi } from '../../apis/notice';
import { getEventListApi, deleteEventApi } from '../../apis/event';
import useUserStore from '../../store/useUserStore';
import AdminPostModal from '../../components/Admin/AdminPostModal';

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
  margin-right: 5px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  cursor: pointer;
`;

const PostTable = ({ posts, onDelete, onEdit, onView }: { posts: any[], onDelete: (id: number) => void, onEdit: (id: number) => void, onView: (id: number) => void }) => {
    if (!posts || posts.length === 0) {
        return <p>게시글이 없습니다.</p>;
    }
    return (
        <Table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>제목</th>
                    <th>작성일</th>
                    <th>작업</th>
                </tr>
            </thead>
            <tbody>
                {posts.map(post => (
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td><Button onClick={() => onView(post.id)}>{post.title}</Button></td>
                        <td>{new Date(post.create_at).toLocaleDateString()}</td>
                        <td>
                            <Button onClick={() => onEdit(post.id)}>수정</Button>
                            <Button onClick={() => onDelete(post.id)}>삭제</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default function PostManagement() {
  const [activeTab, setActiveTab] = useState<'notice' | 'event'>('notice');
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useUserStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'view' | 'edit'>('create');
  const [selectedPostId, setSelectedPostId] = useState<number | undefined>(undefined);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = activeTab === 'notice' 
        ? await getNoticeListApi() 
        : await getEventListApi();
      setPosts(response.data || []);
    } catch (error) {
      console.error("게시글 목록을 불러오는데 실패했습니다:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [activeTab]);

  const handleDelete = async (id: number) => {
    if (!userInfo?.token || !window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;

    try {
        if (activeTab === 'notice') {
            await deleteNoticeApi(id, userInfo.token);
        } else {
            await deleteEventApi(id, userInfo.token);
        }
        alert("게시글이 삭제되었습니다.");
        fetchPosts();
    } catch (error) {
        console.error("삭제에 실패했습니다:", error);
        alert("삭제에 실패했습니다.");
    }
  };

  const handleCreateClick = () => {
    setModalMode('create');
    setSelectedPostId(undefined);
    setIsModalOpen(true);
  };

  const handleEditClick = (id: number) => {
    setModalMode('edit');
    setSelectedPostId(id);
    setIsModalOpen(true);
  };

  const handleViewClick = (id: number) => {
    setModalMode('view');
    setSelectedPostId(id);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPostId(undefined);
  };

  const handleModalSuccess = () => {
    fetchPosts();
  };

  return (
    <div>
      <h2>콘텐츠 관리</h2>
      <Tabs>
        <TabButton onClick={() => setActiveTab('notice')} active={activeTab === 'notice'}>공지사항</TabButton>
        <TabButton onClick={() => setActiveTab('event')} active={activeTab === 'event'}>이벤트</TabButton>
      </Tabs>
      <div>
        <Button onClick={handleCreateClick}>새 {activeTab === 'notice' ? '공지사항' : '이벤트'} 작성</Button>
      </div>
      {loading ? <p>목록을 불러오는 중...</p> : <PostTable posts={posts} onDelete={handleDelete} onEdit={handleEditClick} onView={handleViewClick} />}

      <AdminPostModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        postType={activeTab}
        mode={modalMode}
        postId={selectedPostId}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}