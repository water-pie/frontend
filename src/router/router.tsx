import Layout from "components/Layouts/Layout";
import PostLayout from "components/Layouts/PostLayout";
import Location from "pages/Category/Location";
import Product from "pages/Category/Product";
import Promotion from "pages/Category/Promotion";
import Login from "pages/Login";
import Main from "pages/Main";
import NotFound from "pages/NotFound";
import NoticesAndEvents from "pages/Post/NoticesAndEvents";
import PostDetail from "pages/Post/PostDetail";
import SelectSignup from "pages/Signup/SelectSignup";
import Signup from "pages/Signup/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="product" element={<Product />} />
          <Route path="location" element={<Location />} />
          <Route path="promotion" element={<Promotion />} />
          <Route path="notices" element={<PostLayout />}>
            <Route index element={<NoticesAndEvents />} />
            <Route path=":id" element={<PostDetail />} />
          </Route>
          <Route path="login" element={<Login />}/>
          <Route path="signup" element={<SelectSignup />} />
          <Route path="signup/:type" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}