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
            getUserInfoApi(),
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
        <S.Title>
          <h3>소셜 미디어 연동</h3>
          <span onClick={() => setIsModalOpen(true)}>경로 수정하기</span>
        </S.Title>
          <S.SocialSection>
            <S.SocialLink>
              <img src={blog} alt="blog" />
              {userInfoData?.influencer?.blogUrl ? (
                <a href={userInfoData.influencer.blogUrl} target="_blank" rel="noopener noreferrer" style={{ flexGrow: 1 }}>
                  <span>내 블로그로 이동</span>
                </a>
              ) : (
                <span onClick={() => setIsModalOpen(true)} style={{ flexGrow: 1 }}>블로그를 등록해주세요.</span>
              )}
            </S.SocialLink>
            <S.SocialLink>
              <img src={tiktok} alt="tiktok" />
              {userInfoData?.influencer?.tiktokUrl ? (
                <a href={userInfoData.influencer.tiktokUrl} target="_blank" rel="noopener noreferrer" style={{ flexGrow: 1 }}>
                  <span>내 틱톡으로 이동</span>
                </a>
              ) : (
                <span onClick={() => setIsModalOpen(true)} style={{ flexGrow: 1 }}>틱톡을 등록해주세요.</span>
              )}
            </S.SocialLink>
            <S.SocialLink>
              <img src={youtube} alt="youtube" />
              {userInfoData?.influencer?.youtubeUrl ? (
                <a href={userInfoData.influencer.youtubeUrl} target="_blank" rel="noopener noreferrer" style={{ flexGrow: 1 }}>
                  <span>내 유튜브로 이동</span>
                </a>
              ) : (
                <span onClick={() => setIsModalOpen(true)} style={{ flexGrow: 1 }}>유튜브를 등록해주세요.</span>
              )}
            </S.SocialLink>
            <S.SocialLink>
              <img src={insta} alt="instagram" />
              {userInfoData?.influencer?.instagramUrl ? (
                <a href={userInfoData.influencer.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ flexGrow: 1 }}>
                  <span>내 인스타그램으로 이동</span>
                </a>
              ) : (
                <span onClick={() => setIsModalOpen(true)} style={{ flexGrow: 1 }}>인스타그램을 등록해주세요.</span>
              )}
            </S.SocialLink>
          </S.SocialSection>
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