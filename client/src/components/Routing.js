import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./user/Home";
import Admin from "./admin/Admin";
import NotFound from "./NotFound";
import Logout from "./admin/Logout";
import DevPage from "./user/DevPage";
import AboutPage from "./user/AboutPage";

export default function Routing({ admin, currentDev }) {
  // ! when admin goes back a page, we get 404 page until manual reload

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signup" element={<Signup />} />
      {admin ? (
        <>
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/home" element={<Home />} />{" "}
          {/* //* incase Admin goes back a page */}
        </>
      ) : (
        <>
          {/* <Route path="*" element={<NotFound />} /> */}
          {/* <Route path="/admin/*" element={<NotFound />} /> */}
          <Route path="/home" element={<Home />} />
          {currentDev ? (
            <>
              {/* //* checks if developer exists */}
              <Route path="/developer/*" element={<DevPage />} />
              <Route path="/about" element={<AboutPage />} />
            </>
          ) : (
            <></>
            // <Route path="*" element={<NotFound />} />
            // <Route path="/developer/*" element={<NotFound />} />
          )}
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
