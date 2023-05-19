import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./App";

export default function Home() {
  const { devs } = useContext(UserContext);

  let navigate = useNavigate();

  function handleDevSelect(dev) {
    navigate(`/developer?developers=${dev.username}`);
  }

  return (
    <>
      <Link to="/">{"Login"}</Link>
      <details role="list">
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
    </>
  );
}
