import { useNavigate } from 'react-router-dom';
import * as S from "styles/my/businessMain";
import { useEffect, useState } from 'react';
import { deleteExperienceApi, getManagedExperienceListApi } from 'apis/manage';
import useUserStore from 'store/useUserStore';
import { type Experience } from 'types/apis/experience';
import CampaignCard from 'components/Campaign/CampaignCard';
import type { BrandManagerInfo, MarketingAgencyInfo } from 'types/apis/user';
import { getUserInfoApi } from 'apis/user';
import { useApiErrorHandler } from 'hooks/useApiErrorHandler';

const BusinessMainPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  const token = userInfo?.token;
  const [userInfoData, setUserInfoData] = useState<BrandManagerInfo | MarketingAgencyInfo | null>(null);
  const [campaigns, setCampaigns] = useState<Experience[]>([]);
  const handleApiError = useApiErrorHandler();

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await getUserInfoApi(token);
          setUserInfoData(response.data);
        } catch (e) {
          handleApiError(e);
        }
      }
    }
    fetchUser();
  }, [])

  const fetchCampaigns = async () => {
    if (userInfo?.token) {
      try {
        const response = await getManagedExperienceListApi(userInfo.token);
        setCampaigns(response.data);
      } catch (error) {
        handleApiError(error);
      }
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [userInfo]);

  const handleDelete = async (id: number) => {
    if (userInfo?.token) {
      if (window.confirm("정말로 이 캠페인을 삭제하시겠습니까?")) {
        try {
          await deleteExperienceApi(id, userInfo.token);
          alert("캠페인이 삭제되었습니다.");
          fetchCampaigns(); // Re-fetch campaigns to update the list
        } catch (error) {
          handleApiError(error);
        }
      }
    }
  };

  return (
    <S.BusinessMainContainer>
      <S.BusinessWelcomeSection>
        <S.BusinessProfileImage />
        <S.BusinessWelcomeText>
          <span>오신 것을 환영합니다</span>
          <h2>{userInfoData?.name}님</h2>
        </S.BusinessWelcomeText>
      </S.BusinessWelcomeSection>

      <S.BusinessInfoSection>
        <S.BusinessInfoBox>
          <label>이메일</label>
          <span>{userInfoData?.email}</span>
        </S.BusinessInfoBox>
        <S.BusinessInfoBox>
          <label>보유 포인트</label>
          0 P
        </S.BusinessInfoBox>
        <S.BusinessInfoBox>
          <label>등록한 캠페인</label>
          {campaigns.length} 개
        </S.BusinessInfoBox>
      </S.BusinessInfoSection>

      <S.BusinessCampaignActivitySection>
        <h3>등록 캠페인</h3>
        {campaigns.length > 0 ? (
          <S.CampaignGrid>
            {campaigns.map((campaign) => (
              <div key={campaign.id}>
                <CampaignCard {...campaign} />
                <S.DeleteButton onClick={() => handleDelete(campaign.id)}>삭제</S.DeleteButton>
              </div>
            ))}
          </S.CampaignGrid>
        ) : (
          <S.BusinessNoActivity>
            <p>등록한 캠페인이 없습니다.</p>
            <button onClick={() => navigate('/campaign/creation')}>캠페인 등록하기</button>
          </S.BusinessNoActivity>
        )}
      </S.BusinessCampaignActivitySection>
    </S.BusinessMainContainer>
  );
};

export default BusinessMainPage;