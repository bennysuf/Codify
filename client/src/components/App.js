import { useState, useEffect, createContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Admin from "./Admin";
import Home from "./Home";
import Signup from "./Signup";
import Logout from "./Logout";

export const UserContext = createContext(null);

function App() {
  const [admin, setAdmin] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    fetch("/admin").then((r) => {
      if (r.ok) {
        // r.json().then(user => console.log(user))
        r.json().then((user) => setAdmin(user));
        // navigate to admin$/${dev_username}
      } else {
        // debugger
        // navigate("/");
        //no need to do anything
      }
    });
  }, []);

  console.log("App admin", admin);
  return (
    <UserContext.Provider
      value={{
        admin,
        setAdmin,
      }}
    >
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        {admin ? (
          <Route path="/admin" element={<Admin />} />
        ) : (
          <Route path="/home" element={<Home />} />
        )}
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
