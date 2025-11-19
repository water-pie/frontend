import Header from "components/Header";
import { Outlet } from "react-router-dom";
import { Container, MainContent } from "styles/layout";
import BottomNavigationBar from "components/common/BottomNavigationBar"; // Import the new component

export const Layout = () => {
  return (
    <Container>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      <BottomNavigationBar /> {/* Render the bottom navigation bar */}
    </Container>
  )
};

export default Layout;