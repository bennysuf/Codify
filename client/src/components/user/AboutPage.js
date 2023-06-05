import { useState, useContext } from "react";
import { UserContext } from "../App";

export default function AboutPage() {
  // const [num, setNum] = useState(100)
  const { currentDev } = useContext(UserContext);

  const { about } = currentDev[0];


  //ternary, if profile.about.length 
  // if(profile.about.length > 100) {
  //   setNum(300)
  // } else if(profile.AboutPage.length > 1000) {
  //   setNum(700)
  // } else {

  // }

  return (
    <>
      <article>
        <header>About Me</header>
        <textarea defaultValue={about} style={{ height: `500px` }}/>
        {/* <textarea defaultValue={profile ? profile.about : ""} style={{ height: `500px` }}/> */}
      </article>
    </>
  );
}
