import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./App";

export default function DevPage() {
  const [currentDev, setCurrentDev] = useState({ username: "Loading..." });

  const { devs } = useContext(UserContext);

  const navigate = useNavigate();

  const { dev_username } = useParams();

  const file = devs.filter((dev) => dev.username === dev_username);
  console.log("user", file);

  /* 
  *1. needs to find if dev exists
  !purely a devpage problem, wont work in parent if page reload
  make async function or setTimeout to let the page load
  setTimeout doesnt work because it seems to save variable first then waits to render
  async wouldnt work because the page renders then rerenders to give dev
  ?make onclick/search in Home, then have filter update state to be current dev in Home, then pass it down here.
  
  *2. if dev doesn't exist, dont give access
  
  *3. if dev exists, render devs page
  
  */

  //TODO: figure out way to have loading screen while filter runs, then render name or error
  useEffect(() => {
    setCurrentDev(file[0]);
  }, []);

  return <>{currentDev?.username}</>;
}
