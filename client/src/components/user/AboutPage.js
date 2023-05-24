import { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import DevNavBar from "./DevNavBar";

export default function AboutPage() {
  // const [num, setNum] = useState(100)
  const { currentDev } = useContext(UserContext);

  const { profile } = currentDev[0];


  //ternary, if profile.about.length 
  // if(profile.about.length > 100) {
  //   setNum(300)
  // } else if(profile.AboutPage.length > 1000) {
  //   setNum(700)
  // } else {

  // }

  return (
    <>
      <DevNavBar />
      <article>
        <header>About Me</header>
        <textarea defaultValue={profile ? profile.about : ""} style={{ height: `500px` }}/>
      </article>
    </>
  );
}
