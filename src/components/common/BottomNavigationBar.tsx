import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';

const BottomNavContainer = styled.nav`
  display: none; /* Hidden by default on larger screens */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 60px; /* Standard height for bottom nav */
  background-color: #fff;
  border-top: 1px solid #eee;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (max-width: 480px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

const NavItem = styled(Link)<{ active: boolean }>` // Use active for transient prop
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-decoration: none;
  color: ${({ active }) => (active ? '#007bff' : '#666')}; // Use active here
  font-size: 12px;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')}; // Use active here
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #007bff;
  }

  span {
    margin-top: 4px;
  }
`;

const BottomNavigationBar = () => {
  const location = useLocation();

  const navItems = [
    { name: '홈', icon: '🏠', path: '/' },
    { name: '제품', icon: '📦', path: '/product' },
    { name: '지역', icon: '📍', path: '/location' },
    { name: '기자단', icon: '📝', path: '/promotion' },
    { name: '마이', icon: '👤', path: '/my' },
  ];

  return (
    <BottomNavContainer>
      {navItems.map((item) => (
        <NavItem
          key={item.name}
          to={item.path}
          active={location.pathname === item.path} // Pass as active
        >
          {item.icon}
          <span>{item.name}</span>
        </NavItem>
      ))}
    </BottomNavContainer>
  );
};

export default BottomNavigationBar;
