import Layout from "components/Layouts/Layout";
import Login from "pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route path="/login" element={<Login></Login>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}