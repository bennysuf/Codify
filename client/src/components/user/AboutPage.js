import { useContext } from "react";
import { UserContext } from "../App";

export default function AboutPage() {
  const { currentDev } = useContext(UserContext);

  const { about } = currentDev;

  return (
    
      <article className="article">
        <header>About Me</header>
        <pre style={{ overflow: "auto", padding: "25px" }}>{about}</pre>
      </article>
   
  );
}
