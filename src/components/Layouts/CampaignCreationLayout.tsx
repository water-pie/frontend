import { Outlet } from "react-router-dom";
import Header from "../Header";
import * as S from "styles/layout";

const CampaignCreationLayout = () => {
  return (
    <S.Container>
      <Header />
      <S.MainContent>
        <Outlet />
      </S.MainContent>
    </S.Container>
  );
};

export default CampaignCreationLayout;
