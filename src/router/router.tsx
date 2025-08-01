import Layout from "components/Layouts/Layout";
import Login from "pages/Login";
import SelectSignup from "pages/Signup/SelectSignup";
import Signup from "pages/Signup/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route path="login" element={<Login></Login>}/>
          <Route path="signup" element={<SelectSignup></SelectSignup>} />
          <Route path="signup/:type" element={<Signup></Signup>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}