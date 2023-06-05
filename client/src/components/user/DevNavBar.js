import { useContext } from "react";
import { UserContext } from "../App";

export default function DevNavBar() {
  const { currentDev } = useContext(UserContext);

  const { username, resume, about, social_links, projects } = currentDev[0];

  const path = window.location.pathname;

  return (
    <>
      <nav>
        {/* <nav aria-label="breadcrumb"> */}
        <ul style={{ marginLeft: "5%" }}>
          <li>
            <strong>Codify</strong>
          </li>
        </ul>
        <ul style={{ marginRight: "3%" }}>
          <li key="dev-page">
            <a
              href={"/developer?developers=" + username}
              className={path === "/developer" ? "secondary" : ""}
            >
              {username}'s page
            </a>
            {/* // TODO: make username first letter capital */}
          </li>
          {about === "" ? (
            <></>
          ) : (
            <li key="about">
              <a
                href={"/developer/about?developers=" + username}
                className={path === "/developer/about" ? "secondary" : ""}
              >
                About
              </a>
            </li>
          )}
          {!projects[0] ? (
            <></>
          ) : (
            <li key="projects">
              <a
                href={"/developer/projects?developers=" + username}
                className={path === "/developer/projects" ? "secondary" : ""}
              >
                Projects
              </a>
            </li>
          )}
          <li key="contact">
            <a
              href={"/developer/contact?developers=" + username}
              className={path === "/developer/contact" ? "secondary" : ""}
            >
              Contact
            </a>
          </li>
          {resume === "" ? (
            <></>
          ) : (
            <li key="resume">
              <a href={"https://" + resume} target="_blank" rel="noreferrer">
                Resume
              </a>
            </li>
          )}
          <li key="home">
            <a href="/home">Home</a>
          </li>
          {!social_links[0] ? (
            <></>
          ) : (
            <li key="social" role="list" dir="rtl">
              {/* li makes it a hover over instead of button*/}
              {/* <details role="list" dir="rtl"> */}
              <summary aria-haspopup="listbox" role="link">
                Socials
              </summary>
              <ul role="listbox">
                {social_links.map((link) => {
                  const { url, website } = link;
                  return (
                    <>
                      <a href={"https://" + url}>{website}</a>
                      {/*// TODO: add styling */}
                    </>
                  );
                })}
              </ul>
              {/* </details> */}
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
