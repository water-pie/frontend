import Layout from "components/Layouts/Layout";
import PostLayout from "components/Layouts/PostLayout";
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
          <Route path="*" element={<P.NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}