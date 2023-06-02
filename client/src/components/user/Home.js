import { useContext } from "react";
import { UserContext } from "../App";
import NavBar from "./NavBar";

export default function Home() {
  const { devs, navigate } = useContext(UserContext);

  function handleDevSelect(dev) {
    navigate(`/developer?developers=${dev.username}`);
  }

  return (
    <div style={{marginTop: "3%"}}>
      <NavBar />
      <details role="list" className="input">
        <summary aria-haspopup="listbox">Find developers</summary>
        <ul role="listbox">
          {devs.map((dev) => {
            return (
              <li key={dev.id} onClick={() => handleDevSelect(dev)}>
                {dev.username}
              </li>
            );
          })}
        </ul>
      </details>
    </div>
  );
}
