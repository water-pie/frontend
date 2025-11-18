import AdminLayout from "components/Layouts/AdminLayout";
import AdminPage from "pages/Admin/Main";
import UserManagement from "pages/Admin/UserManagement";
import PostManagement from "pages/Admin/PostManagement";
import InquiryManagement from "pages/Admin/InquiryManagement";
import PointManagement from "pages/Admin/PointManagement";
import Layout from "components/Layouts/Layout";
import PostLayout from "components/Layouts/PostLayout";
import CampaignCreationLayout from "components/Layouts/CampaignCreationLayout";
import BusinessMyPageLayout from 'components/Layouts/BusinessMyPageLayout';
import MyPageLayout from "components/Layouts/MyPageLayout";
import * as P from "pages";
import Search from "pages/Search";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/campaign/creation" element={<CampaignCreationLayout />}>
          <Route index element={<P.CreationStep1 />} />
          <Route path="step1" element={<P.CreationStep1 />} />
          <Route path="step2" element={<P.CreationStep2 />} />
          <Route path="step3" element={<P.CreationStep3 />} />
          <Route path="step4" element={<P.CreationStep4 />} />
          <Route path="step5" element={<P.CreationStep5 />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<P.Main />} />
          <Route path="product" element={<P.Product />} />
          <Route path="location" element={<P.Location />} />
          <Route path="promotion" element={<P.Promotion />} />
          <Route path="search" element={<Search />} />
          <Route path="post" element={<PostLayout />}>
            <Route index element={<P.NoticesAndEvents />} />
            <Route path=":type/:id" element={<P.PostDetail />} />
          </Route>
          <Route path="login" element={<P.Login />}/>
          <Route path="signup" element={<P.SelectSignup />} />
          <Route path="signup/:type" element={<P.Signup />} />
          <Route path="campaign/:id" element={<P.CampaignPage />} />
          <Route path="campaign/:id/apply" element={<P.Application />} />
          <Route path="my" element={<MyPageLayout />}>
            <Route index element={<P.MyMain />} />
            <Route path="profile" element={<P.ProfileEdit />} />
            <Route path="points" element={<P.PointManagement />} />
            <Route path="penalty" element={<P.PenaltyStatus />} />
            <Route path="campaigns/applied" element={<P.AppliedCampaigns />} />
            <Route path="campaigns/ongoing" element={<P.OngoingCampaigns />} />
            <Route path="campaigns/finished" element={<P.FinishedCampaigns />} />
            <Route path="inquiry" element={<P.Inquiry />} />
            <Route path="inquiry/write" element={<P.InquiryWrite />} />
            <Route path="inquiry/:id" element={<P.InquiryDetail />} />
          </Route>
          <Route path="business" element={<BusinessMyPageLayout />}>
            <Route index element={<P.BusinessMyMain />} />
            <Route path="profileEdit" element={<P.ProfileEdit />} />
            <Route path="pointManagement" element={<P.BusinessPointManagement />} />
            <Route path="managementCampaigns" element={<P.RegisteredCampaigns />} />
            <Route path="pastCampaigns" element={<P.FinishedCampaigns />} />
            <Route path="inquiry" element={<P.Inquiry />} />
          </Route>
          <Route path="payment/success" element={<P.PaymentSuccessPage/>}/>
          <Route path="payment/fail" element={<P.PaymentFailPage/>}/>
          <Route path="*" element={<P.NotFound />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="posts" element={<PostManagement />} />
            <Route path="inquiries" element={<InquiryManagement />} />
            <Route path="points" element={<PointManagement />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
