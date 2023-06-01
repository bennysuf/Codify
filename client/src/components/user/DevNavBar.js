import { useContext } from "react";
import { UserContext } from "../App";

export default function DevNavBar() {
  const { currentDev } = useContext(UserContext);

  const { username, resume, about, social_links } = currentDev[0];
  // const { about, resume } = profile;

  // TODO: if current page, make <a> class="secondary" else ""

  return (
    <>
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
              <a href={"https://" + resume} target="_blank" rel="noreferrer">
                Resume
              </a>
            </li>
          )}
          <li key="home">
            <a href="/home">Home</a>
          </li>
          {social_links === "" ? (
            // TODO: after changing social_links column, change "" to []
            <></>
          ) : (
            <li>
              <details role="list" dir="rtl">
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
              </details>
            </li>
            
          )}
        </ul>
      </nav>
    </>
  );
}
