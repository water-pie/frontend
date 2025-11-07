import { useNavigate } from 'react-router-dom';
import useUserStore from 'store/useUserStore';

export const useApiErrorHandler = () => {
  const navigate = useNavigate();
  const { logout } = useUserStore();

  const handleApiError = (error: any) => {
    // Here we can check for specific error status codes if the API returns them
    // For now, we'll assume any error is a token expiration error as per the request.
    console.error("API Error:", error);
    alert("세션이 만료되었습니다. 다시 로그인해주세요.");
    logout();
    navigate('/login');
  };

  return handleApiError;
};
