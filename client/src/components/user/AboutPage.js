import { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import DevNavBar from "./DevNavBar";

export default function AboutPage() {
  const { currentDev } = useContext(UserContext);

  const { profile } = currentDev[0];

  return (
    <>
      <DevNavBar />
      <article>
        <header>About Me</header>
        <textarea defaultValue={profile.about}/>
      </article>
    </>
  );
}
