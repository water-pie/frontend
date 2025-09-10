import { styled } from 'styled-components';

export const MyPageLayout = styled.div`
  display: flex;
  gap: 80px;
  padding: 40px 0;
  max-width: 1200px;
  margin: 0 auto;
`;

export const MyPageNav = styled.nav`
  width: 200px;
  flex-shrink: 0;

  h2 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 30px;
  }
`;

export const NavBlock = styled.div`
  margin-bottom: 30px;

  h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 10px;
  }

  a {
    text-decoration: none;
    color: #888;
    font-size: 16px;

    &.active {
      color: #000;
      font-weight: bold;
    }
  }
`;

export const MyPageContent = styled.main`
  flex-grow: 1;
`;
