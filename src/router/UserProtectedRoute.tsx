import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../store/useUserStore';
import { useEffect } from 'react';

const UserProtectedRoute = () => {
  const { isLoggedIn } = useUserStore();

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;
