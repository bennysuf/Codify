import React, { useState, useEffect, createContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "@picocss/pico/css/pico.min.css";
import Routing from "./Routing";

export const UserContext = createContext(null);

function App() {
  const [admin, setAdmin] = useState(null);
  const [devs, setDevs] = useState([]);
  const [reload, setReload] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const param = searchParams.get("developers");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/admin").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          if (user) {
            setAdmin(user);
          }
        });
      }
    });
  }, [reload]);

  useEffect(() => {
    fetch("/developers")
      .then((r) => r.json())
      .then(setDevs);
  }, []);

  const currentDev = devs.find((dev) => dev.username === param);

  return (
    <UserContext.Provider
      value={{
        admin,
        setAdmin,
        devs,
        setDevs,
        currentDev,
        navigate,
        setReload
      }}
    >
      <Routing admin={admin} currentDev={currentDev} />
    </UserContext.Provider>
  );
}

export default App;
