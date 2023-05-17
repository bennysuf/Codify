import { useState, useEffect, createContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Admin from "./Admin";
import Home from "./Home";
import Signup from "./Signup";
import Logout from "./Logout";
import DevPage from "./DevPage";
import "@picocss/pico/css/pico.min.css";
import api from "../api";

export const UserContext = createContext(null);

function App() {
  const [admin, setAdmin] = useState(null);
  const [devs, setDevs] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    api("/admin").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setAdmin(user)
        });
      }
    });
  }, []);

  useEffect(() => {
    api("/developers")
      .then((r) => r.json())
      .then(setDevs);
  }, []);

  return (
    <UserContext.Provider
      value={{
        admin,
        setAdmin,
        devs,
        setDevs
      }}
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        {devs.length ?
          admin ? (
            <Route path="/admin/:dev_username" element={<Admin />} />
          ) : (
            <>
            <Route path="/home" element={<Home />} />
            <Route path="/developers/:dev_username" element={<DevPage />} />
            </>
          )
        : <></>}
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
