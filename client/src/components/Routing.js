import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./user/Home";
import Admin from "./admin/Admin";
import NotFound from "./NotFound";
import Logout from "./admin/Logout";
import DevPage from "./user/DevPage";

export default function Routing({ admin, currentDev }) {
  // ! when admin goes back a page, we get 404 page until manual reload

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signup" element={<Signup />} />
      {admin ? (
        // for admin access
        <>
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/home" element={<Home />} />
          {/* ^ incase Admin goes back a page */}
        </>
      ) : (
        <>
          <Route path="/home" element={<Home />} />
          {currentDev ? (
            // for user access to developer pages
            <>
              <Route path="/developer/*" element={<DevPage />} />
            </>
          ) : (
            <></>
          )}
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
