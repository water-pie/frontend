import { useNavigate } from 'react-router-dom';
import * as S from "styles/my/businessMain";

const BusinessMainPage = () => {
  const navigate = useNavigate();

  return (
    <S.BusinessMainContainer>
      <S.BusinessWelcomeSection>
        <S.BusinessProfileImage />
        <S.BusinessWelcomeText>
          <span>오신 것을 환영합니다</span>
          <h2>Username님</h2>
        </S.BusinessWelcomeText>
      </S.BusinessWelcomeSection>

      <S.BusinessInfoSection>
        <S.BusinessInfoBox>
          <label>이메일</label>
          waterpie1234@gmail.com
        </S.BusinessInfoBox>
        <S.BusinessInfoBox>
          <label>보유 포인트</label>
          0 P
        </S.BusinessInfoBox>
        <S.BusinessInfoBox>
          <label>등록한 캠페인</label>
          0 개
        </S.BusinessInfoBox>
      </S.BusinessInfoSection>

      <S.BusinessCampaignActivitySection>
        <h3>등록 캠페인</h3>
        <S.BusinessNoActivity>
          <p>등록한 캠페인이 없습니다.</p>
          <button onClick={() => navigate('/campaign/creation')}>캠페인 등록하기</button>
        </S.BusinessNoActivity>
      </S.BusinessCampaignActivitySection>
    </S.BusinessMainContainer>
  );
};

export default BusinessMainPage;