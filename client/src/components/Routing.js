import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./user/Home";
import Admin from "./admin/Admin";
import NotFound from "./NotFound";
import Logout from "./admin/Logout";
import DevPage from "./user/DevPage";
import ContactForm from "./ContactForm";

export default function Routing({ admin, currentDev }) {

  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        {admin ?  <Route path="/admin/*" element={<Admin />} /> : <></>}
        {currentDev ? <Route path="/developer/*" element={<DevPage />} /> : <></>}
        <Route path="/contact" element={<ContactForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
}
