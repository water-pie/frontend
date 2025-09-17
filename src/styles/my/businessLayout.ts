import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const BusinessMyPageLayoutContainer = styled.div`
  display: flex;
  gap: 80px;
  padding: 40px 0;
  width: 1180px;
  margin: 0 auto;
`;

export const BusinessMyPageNav = styled.nav`
  width: 200px;
  flex-shrink: 0;

  h2 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 30px;
  }
`;

export const BusinessNavBlock = styled.div`
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
`;

export const BusinessNavLink = styled(Link)`
  text-decoration: none;
  color: #888;
  font-size: 16px;

  &.active {
    color: #000;
    font-weight: bold;
  }
`;

export const BusinessMyPageContent = styled.main`
  flex-grow: 1;
`;
