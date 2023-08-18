import { Link } from "react-router-dom";
import { UserContext } from "./App";
import { useContext } from "react";

export default function ProjectCard({ project, collabs }) {
  const { currentDev, admin } = useContext(UserContext);
  const { title, url, description, linkText } = project;

  return (
    <article className="card">
      <header>{title}</header>
      <h4>
        <a href={url} target="_blank" rel="noreferrer">
          {linkText}
        </a>
      </h4>
      <pre style={{ overflow: "auto", padding: "25px" }}>{description}</pre>
      {collabs[0] ? (
        <nav>
          <li key="social" role="list" dir="rtl">
            <summary aria-haspopup="listbox" role="link">
              Collaborators
            </summary>
            <ul role="listbox">
              {/* //! collab appears ontop of nav card */}
              {collabs.map((dev) => {
                const { dev_username, id } = dev;
                if (
                  dev_username !== currentDev?.username &&
                  dev_username !== admin?.username
                ) {
                  // *might not need it if you cant add self username to begin with
                  return (
                    <Link key={id} to={`/developer?developers=${dev_username}`}>
                      {dev_username}
                    </Link>
                  );
                }
              })}
            </ul>
          </li>
        </nav>
      ) : (
        <></>
      )}
    </article>
  );
}
