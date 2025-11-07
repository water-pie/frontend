import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { getExperienceApplicationListApi, selectExperienceMembersApi } from 'apis/manage';
import useUserStore from 'store/useUserStore';
import { type ExperienceApplication } from 'types/apis/manage';

interface Props {
  campaignId: number;
  onClose: () => void;
}

const InfluencerSelectionModal = ({ campaignId, onClose }: Props) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [applicants, setApplicants] = useState<ExperienceApplication[]>([]);
  const { userInfo } = useUserStore();

  useEffect(() => {
    const fetchApplicants = async () => {
      if (userInfo?.token) {
        try {
          const response = await getExperienceApplicationListApi(campaignId, userInfo.token);
          setApplicants(response.data);
        } catch (error) {
          console.error('Failed to fetch applicants:', error);
          alert('신청자 목록을 불러오는데 실패했습니다.');
        }
      }
    };
    fetchApplicants();
  }, [campaignId, userInfo?.token]);

  const handleSelect = (id: number) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getChannelName = (applicant: ExperienceApplication) => {
    if (applicant.youtube_url) return 'Youtube';
    if (applicant.instagram_url) return 'Instagram';
    if (applicant.blog_url) return 'Blog';
    if (applicant.tiktok_url) return 'Tiktok';
    return 'N/A';
  }

  const handleSubmit = async () => {
    if (userInfo?.token) {
      try {
        await selectExperienceMembersApi(campaignId, { selected_members: selected.map(String) }, userInfo.token);
        alert('선정이 완료되었습니다.');
        onClose();
      } catch (error) {
        console.error('Failed to select members:', error);
        alert('멤버 선정에 실패했습니다.');
      }
    }
  };

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>인플루언서 선정</h2>
          <CloseButton onClick={onClose}>X</CloseButton>
        </Header>
        <Table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>No</th>
              <th>신청자</th>
              <th>신청 채널</th>
              <th>신청 한마디</th>
              <th>선정 상태</th>
            </tr>

          </thead>
          <tbody>
            {applicants.map((applicant, index) => (
              <tr key={applicant.application_id}>
                <td><input type="checkbox" checked={selected.includes(applicant.influencer_id)} onChange={() => handleSelect(applicant.influencer_id)} /></td>
                <td>{index + 1}</td>
                <td>{applicant.influencer_name}</td>
                <td>{getChannelName(applicant)}</td>
                <td>{String(applicant.pitch_text)}</td>
                <td>{applicant.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <SubmitButton onClick={handleSubmit}>선정하기</SubmitButton>
      </ModalContent>
    </ModalBackground>
  );
};

export default InfluencerSelectionModal;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 1000px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  th {
    background-color: #f2f2f2;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;
