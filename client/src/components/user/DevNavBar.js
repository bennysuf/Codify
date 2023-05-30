import { useContext } from "react";
import { UserContext } from "../App";

export default function DevNavBar() {
  const { currentDev } = useContext(UserContext);

  const { username, resume, about } = currentDev[0];
  // const { about, resume } = profile;

  // TODO: if current page, make <a> class="secondary" else ""

  return (
    <nav aria-label="breadcrumb">
      <ul style={{ marginLeft: "3%" }}>
        <li key="dev-page">
          <a href={"/developer?developers=" + username}>{username}'s page</a>
          {/* // TODO: make username first letter capital */}
        </li>
        {about === "" ? (
          <></>
        ) : (
          <li key="about">
            <a href={"/about?developers=" + username}>About</a>
          </li>
        )}
        <li key="contact">
          <a href={"/contact?developers=" + username}>Contact</a>
        </li>
        {resume === "" ? (
          <></>
        ) : (
          <li key="resume">
            <a
              href={"https://" + resume}
              target="_blank"
              rel="noreferrer"
            >
              Resume
            </a>
          </li>
        )}
        <li key="home">
          <a href="/home">Home</a>
        </li>
      </ul>
    </nav>
  );
}
