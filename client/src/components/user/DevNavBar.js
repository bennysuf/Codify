import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

export default function DevNavBar() {
  const { currentDev } = useContext(UserContext);

  const { username, resume, about, social_link, projects } = currentDev[0];

  const [socialLinks, setSocialLinks] = useState(false);

  useEffect(() => {
    const obj = Object.values(social_link).filter((value) => value !== "");

    if (obj[0]) {
      setSocialLinks(true);
    }
  }, [social_link]);

  const path = window.location.pathname;

  return (
    <>
      <nav>
        <ul style={{ marginLeft: "5%" }}>
          <li>
            <strong>Codify</strong>
          </li>
        </ul>
        <ul style={{ marginRight: "3%" }}>
          <li key="dev-page">
            <Link
              to={"/developer?developers=" + username}
              className={path === "/developer" ? "secondary" : ""}
            >
              {username}'s page
            </Link>
          </li>
          {about === "" ? (
            <></>
          ) : (
            <li key="about">
              <Link
                to={"/developer/about?developers=" + username}
                className={path === "/developer/about" ? "secondary" : ""}
              >
                About
              </Link>
            </li>
          )}
          {!projects[0] ? (
            <></>
          ) : (
            <li key="projects">
              <Link
                to={"/developer/projects?developers=" + username}
                className={path === "/developer/projects" ? "secondary" : ""}
              >
                Projects
              </Link>
            </li>
          )}
          {resume === "" ? (
            <></>
          ) : (
            <li key="resume">
              <Link to={"https://" + resume} target="_blank" rel="noreferrer">
                Resume
              </Link>
            </li>
          )}
          <li key="home">
            <Link to="/home">Home</Link>
          </li>
          {socialLinks ? (
            <li key="social" role="list" dir="rtl">
              <summary aria-haspopup="listbox" role="link">
                Socials
              </summary>
              <ul role="listbox">
                {Object.entries(social_link).map((link) => {
                  return link[1] ? (
                    <Link
                      key={link[0]}
                      to={"https://" + link[1]}
                      style={{ marginBottom: "2px", margin: "2px" }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link[0]}
                    </Link>
                  ) : (
                    ""
                  );
                })}
              </ul>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </nav>
    </>
  );
}
