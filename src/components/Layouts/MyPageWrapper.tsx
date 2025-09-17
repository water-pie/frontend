import useUserStore from 'store/useUserStore';
import MyPageLayout from './MyPageLayout';
import { useNavigate } from 'react-router-dom';

const MyPageWrapper = () => {
  const { userInfo } = useUserStore();
  const userType = userInfo?.type;
  const navigator = useNavigate();

  if (userType === 2 || userType === 3) {
    navigator("/business");
  } else {
    return <MyPageLayout />;
  }
};

export default MyPageWrapper;
