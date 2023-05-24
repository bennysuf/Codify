import React, { useState, useEffect, createContext } from "react";
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./user/Home";
import Admin from "./admin/Admin";
import NotFound from "./NotFound";
import Logout from "./admin/Logout";
import DevPage from "./user/DevPage";
import "@picocss/pico/css/pico.min.css";
import AboutPage from "./user/AboutPage";

export const UserContext = createContext(null);

function App() {
  const [admin, setAdmin] = useState(null);
  const [devs, setDevs] = useState([]);
  const [projects, setProjects] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const param = searchParams.get("developers");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/admin").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          if(user){
            setAdmin(user);
            setProjects(user.projects)
          }
          //TODO: remove setProjects
        });
      }
    });
  }, []);

  useEffect(() => {
    fetch("/developers")
      .then((r) => r.json())
      .then(setDevs);
  }, []);

  const currentDev = devs.filter(
    (dev) => dev.username === param
  );
  // const currentDev = devs.filter(
  //   (dev) => dev.username === param && dev.public_profile === true
  // );

  return (
    <UserContext.Provider
      value={{
        admin,
        setAdmin,
        devs,
        setDevs,
        currentDev,
        projects,
        setProjects,
        navigate
      }}
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        {admin ? (
          <>
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/home" element={<Home />} /> {/* incase Admin goes back a page*/}
          </>
        ) : (
          <>
            <Route path="/admin/*" element={<NotFound />} />
            <Route path="/home" element={<Home />} />
            {currentDev[0] ? (
              <>
                <Route path="/developer/*" element={<DevPage />} />
                <Route path="/about" element={<AboutPage />} />
              </>
            ) : (
              <Route path="/developer/*" element={<NotFound />} />
            )}
          </>
        )}
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
