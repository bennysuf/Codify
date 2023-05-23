import { useContext } from "react";
import { UserContext } from "../App";

export default function DevNavBar(){
    const { currentDev } = useContext(UserContext);

    const { username, profile } = currentDev[0]

    //if current page, make <a> class="secondary" else "" 

    return (
        <nav aria-label="breadcrumb">
        <ul>
          <li key="dev-page">
            <a href={"/developer?developers=" + username}>Dev page</a>
          </li>
          <li key="about">
            <a href={"/about?developers=" + username}>About</a>
          </li>
          <li key="contact">
            <a href={"/contact?developers=" + username}>Contact</a>
          </li>
          <li key="resume">
            <a
              href={"https://" + profile.resume}
              target="_blank"
              rel="noreferrer"
            >
              Resume
            </a>
          </li>
          <li key="home">
            <a href="/home">Home</a>
          </li>
        </ul>
      </nav>
    )
}