import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from 'styles/my/main';
import {
  blog,
  youtube,
  insta,
  tiktok,
} from 'utils/importing';
import useUserStore from 'store/useUserStore';
import { getUserInfoApi } from 'apis/user';
import { getMyPenaltyCount } from 'apis/penalties';
import { type InfluencerInfo } from 'types/apis/user';
import SocialMediaModal from 'components/Modal/SocialMediaModal';
import { useApiErrorHandler } from 'hooks/useApiErrorHandler';

const MyPageMain = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  const token = userInfo?.token;
  const [userInfoData, setUserInfoData] = useState<InfluencerInfo | null>(null);
  const [penaltyCount, setPenaltyCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleApiError = useApiErrorHandler();

  useEffect(() => {
    const fetchMyPageData = async () => {
      if (token) {
        try {
          const [userInfoRes, penaltyCountRes] = await Promise.all([
            getUserInfoApi(token),
            getMyPenaltyCount(token),
          ]);
          setUserInfoData(userInfoRes.data);
          setPenaltyCount(penaltyCountRes.data.count);
        } catch (error) {
          handleApiError(error);
        }
      }
    };
    fetchMyPageData();
  }, [token, navigate]);

  const handleUpdateUrl = (updatedData: InfluencerInfo) => {
    setUserInfoData(updatedData);
  };

  return (
    <S.MainContainer>
      <S.WelcomeSection>
        <S.ProfileImage />
        <S.WelcomeText>
          <span>오신 것을 환영합니다</span>
          <h2>{userInfoData?.name}님</h2>
        </S.WelcomeText>
      </S.WelcomeSection>

      <S.InfoSection>
        <S.InfoBox>
          <label>이메일</label>
          <span>{userInfoData?.email}</span>
        </S.InfoBox>
        <S.InfoBox>
          <label>보유 포인트</label>
          <span>{userInfoData?.points || 0} P</span>
        </S.InfoBox>
        <S.InfoBox>
          <label>참여한 캠페인</label>
          <span>0 개</span> {/* TODO: 참여한 캠페인 API 연동 */}
        </S.InfoBox>
        <S.InfoBox>
          <label>패널티</label>
          <span>{penaltyCount} 개</span>
        </S.InfoBox>
      </S.InfoSection>

      <S.SocialContainer>
        <h3>소셜 미디어 연동</h3>
        <div onClick={() => setIsModalOpen(true)}>
          <S.SocialSection>
            <S.SocialLink>
              <img src={blog} alt="blog" />
              <span>{userInfoData?.blogUrl ? userInfoData.blogUrl : "블로그를 등록해주세요."}</span>
              <S.Arrow />
            </S.SocialLink>
            <S.SocialLink>
              <img src={tiktok} alt="tiktok" />
              <span>{userInfoData?.tiktokUrl ? userInfoData.tiktokUrl : "틱톡을 등록해주세요."}</span>
              <S.Arrow />
            </S.SocialLink>
            <S.SocialLink>
              <img src={youtube} alt="youtube" />
              <span>{userInfoData?.youtubeUrl ? userInfoData.youtubeUrl : "유튜브를 등록해주세요."}</span>
              <S.Arrow />
            </S.SocialLink>
            <S.SocialLink>
              <img src={insta} alt="instagram" />
              <span>{userInfoData?.instagramUrl ? userInfoData.instagramUrl : "인스타그램을 등록해주세요."}</span>
              <S.Arrow />
            </S.SocialLink>
          </S.SocialSection>
        </div>
      </S.SocialContainer>

      <S.CampaignActivitySection>
        <h3>캠페인 활동</h3>
        <S.NoActivity>
          <p>아직 참여한 캠페인이 없습니다.</p>
          <button>캠페인 둘러보기</button>
        </S.NoActivity>
      </S.CampaignActivitySection>

      {isModalOpen && (
        <SocialMediaModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userInfoData={userInfoData}
          onUpdate={handleUpdateUrl}
        />
      )}
    </S.MainContainer>
  );
};

export default MyPageMain;