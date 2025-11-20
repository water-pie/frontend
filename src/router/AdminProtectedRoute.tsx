import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../store/useUserStore';
import { useEffect } from 'react';

const ProtectedRoute = () => {
  const { isLoggedIn, userInfo } = useUserStore();

  const isAdmin = isLoggedIn && userInfo?.type === 'ADMIN';

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
    } else if (!isAdmin) {
      alert('접근 권한이 없습니다.');
    }
  }, [isLoggedIn, isAdmin]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
