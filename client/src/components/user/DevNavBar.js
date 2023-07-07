import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

export default function DevNavBar() {
  const { currentDev, navigate } = useContext(UserContext);

  const { username, resume, about, social_link, ordered_projects } = currentDev;

  const [socialLinks, setSocialLinks] = useState(false);

  useEffect(() => {
    setSocialLinks(false);
    const obj = Object.values(social_link).filter((value) => value !== "");

    if (obj[0]) {
      setSocialLinks(true);
    }
  }, [social_link]);

  const path = window.location.pathname;

  return (
    <body>
      <main class="container">
        <nav>
          <ul style={{ marginLeft: "3%" }}>
            <li>
              <strong onClick={() => navigate("/")}>Codify</strong>
            </li>
          </ul>
          <ul style={{ marginRight: "7%" }}>
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
            {!ordered_projects[0] ? (
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
            <li key="home">
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      </main>
    </body>
  );
}
