import styled from '@emotion/styled';

export const MyPageLayout = styled.div`
  display: flex;
  gap: 80px;
  padding: 40px 20px; /* Adjusted padding */
  width: 100%; /* Changed from 1180px */
  max-width: 1180px; /* Added max-width */
  margin: 0 auto;
  box-sizing: border-box; /* Added box-sizing */

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
    padding: 20px 15px;
  }
`;

export const MyPageNav = styled.nav`
  width: 200px;
  flex-shrink: 0;

  h2 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  @media (max-width: 768px) {
    width: 100%;
    
    h2 {
      margin-bottom: 20px;
    }
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

  @media (max-width: 768px) {
    margin-bottom: 20px;

    ul {
      display: flex; /* Change to horizontal list on mobile */
      flex-wrap: wrap; /* Allow wrapping */
      gap: 15px;
    }

    li {
      margin-bottom: 0;
    }
  }
`;

export const MyPageContent = styled.main`
  flex-grow: 1;
`;