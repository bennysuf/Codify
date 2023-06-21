import { useContext } from "react";
import { UserContext } from "../App";

export default function AboutPage() {
  const { currentDev } = useContext(UserContext);

  const { about } = currentDev;

  return (
    <>
      <article>
        <header>About Me</header>
        <textarea defaultValue={about} readOnly style={{ height: `500px` }}/>
      </article>
    </>
  );
}
