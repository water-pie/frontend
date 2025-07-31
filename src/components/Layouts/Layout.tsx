import Header from "components/Header";
import { Outlet } from "react-router-dom";
import { Container, MainContent } from "styles/main";

export const Layout = () => {
  return (
    <Container>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
    </Container>
  )
};

export default Layout;