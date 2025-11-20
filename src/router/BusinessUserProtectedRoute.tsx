import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../store/useUserStore';
import { useEffect } from 'react';

const BusinessUserProtectedRoute = () => {
  const { isLoggedIn, userInfo } = useUserStore();

  const isBusiness = isLoggedIn && (userInfo?.type === 'MARKETING_AGENCY' || userInfo?.type === 'BRAND_MANAGER');

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
    } else if (!isBusiness) {
      alert('접근 권한이 없습니다.');
    }
  }, [isLoggedIn, isBusiness]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!isBusiness) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default BusinessUserProtectedRoute;
