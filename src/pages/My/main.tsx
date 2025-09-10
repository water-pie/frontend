import * as S from '../../styles/my/main';
import {
  blog,
  youtube,
  insta,
  tiktok,
} from '../../utils/importing';

const MyPageMain = () => {
  return (
    <S.MainContainer>
      <S.WelcomeSection>
        <S.ProfileImage />
        <S.WelcomeText>
          <p>오신 것을 환영합니다</p>
          <h2>Username님</h2>
        </S.WelcomeText>
      </S.WelcomeSection>

      <S.InfoSection>
        <S.InfoBox>
          <label>이메일</label>
          <p>waterpie1234@gmail.com</p>
        </S.InfoBox>
        <S.InfoBox>
          <label>보유 포인트</label>
          <p>0 P</p>
        </S.InfoBox>
        <S.InfoBox>
          <label>참여한 캠페인</label>
          <p>0 개</p>
        </S.InfoBox>
        <S.InfoBox>
          <label>패널티</label>
          <p>0 개</p>
        </S.InfoBox>
      </S.InfoSection>

      <S.SocialSection>
        <h3>소셜 미디어 연동</h3>
        <S.SocialLink>
          <img src={blog} alt="blog" />
          <span>블로그를 등록해주세요.</span>
          <S.Arrow />
        </S.SocialLink>
        <S.SocialLink>
          <img src={tiktok} alt="tiktok" />
          <span>틱톡을 등록해주세요.</span>
          <S.Arrow />
        </S.SocialLink>
        <S.SocialLink>
          <img src={youtube} alt="youtube" />
          <span>유튜브를 등록해주세요.</span>
          <S.Arrow />
        </S.SocialLink>
        <S.SocialLink>
          <img src={insta} alt="instagram" />
          <span>인스타그램을 등록해주세요.</span>
          <S.Arrow />
        </S.SocialLink>
      </S.SocialSection>

      <S.CampaignActivitySection>
        <h3>캠페인 활동</h3>
        <S.NoActivity>
          <p>아직 참여한 캠페인이 없습니다.</p>
          <button>캠페인 둘러보기</button>
        </S.NoActivity>
      </S.CampaignActivitySection>
    </S.MainContainer>
  );
};

export default MyPageMain;
