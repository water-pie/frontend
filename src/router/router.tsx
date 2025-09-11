import Layout from "components/Layouts/Layout";
import PostLayout from "components/Layouts/PostLayout";
import MyPageLayout from "components/Layouts/MyPageLayout"; // Added import
import * as P from "pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<P.Main />} />
          <Route path="product" element={<P.Product />} />
          <Route path="location" element={<P.Location />} />
          <Route path="promotion" element={<P.Promotion />} />
          <Route path="notices" element={<PostLayout />}>
            <Route index element={<P.NoticesAndEvents />} />
            <Route path=":id" element={<P.PostDetail />} />
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
            <Route path="penalty" element={<P.PenaltyStatus />} /> {/* Added Penalty Status Route */}
            <Route path="campaigns/applied" element={<P.AppliedCampaigns />} />
            <Route path="campaigns/ongoing" element={<P.OngoingCampaigns />} />
            <Route path="campaigns/finished" element={<P.FinishedCampaigns />} />
            <Route path="inquiry" element={<P.Inquiry />} />
            <Route path="inquiry/write" element={<P.InquiryWrite />} />
            <Route path="inquiry/:id" element={<P.InquiryDetail />} />
          </Route>
          <Route path="*" element={<P.NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}