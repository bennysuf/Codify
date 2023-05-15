import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./App";

export default function DevPage() {
  const [currentDev, setCurrentDev] = useState([]);

  const { devs } = useContext(UserContext);

  const navigate = useNavigate();

  const { devname } = useParams();

  const file = devs.filter((dev) => dev.username === devname);

  /* 
  *1. needs to find if dev exists
    !purely a devpage problem
    
  *2. if dev doesn't exist, dont give access

  *3. if dev exists, render devs page

  */

  //TODO: figure out way to have loading screen while filter runs, then render name or error
  useEffect(() => {
    setCurrentDev(file);
  }, []);

  return (
    <>
      {currentDev[0] ? (
        <h4>{currentDev.username}</h4>
      ) : (
        <h3>Uh oh, seems like you need to find another developer</h3>
      )}
    </>
  );
}
