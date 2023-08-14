import { useContext } from "react";
import { UserContext } from "../App";
import { AdminContext } from "./Admin";
import { Link } from "react-router-dom";

export default function AdminNavBar() {
  const path = window.location.pathname;

  const { setAdmin } = useContext(UserContext);
  const { setProjects } = useContext(AdminContext);

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      setAdmin(null);
      setProjects([]);
    });
  }

  const navbar = (
    <>
      <li key="projects-page">
        <Link
          to="/admin/projects-page"
          className={path === "/admin/projects-page" ? "secondary" : ""}
        >
          Projects
        </Link>
      </li>
      <li key="new-project">
        <Link
          to="/admin/new-project"
          className={path === "/admin/new-project" ? "secondary" : ""}
        >
          New project
        </Link>
      </li>
      <li key="about">
        <Link
          to="/admin/edit-admin"
          className={path === "/admin/edit-admin" ? "secondary" : ""}
        >
          Edit profile
        </Link>
      </li>
      <li key="logout">
        <a href="/" onClick={handleLogout}>
          Log out
        </a>
      </li>
    </>
  );

  const desktopNav = (
    <ul style={{ marginRight: "3%" }} className="hide-on-mobile">
      {navbar}
    </ul>
  );

  const mobileNav = (
    <li key="dropdown" role="list" dir="rtl" className="hide-on-desktop">
      <summary aria-haspopup="listbox" role="link">
        ☰
      </summary>
      <ul role="listbox" style={{ marginRight: "3%" }}>
        {navbar}
      </ul>
    </li>
  );

  return (
    <article>
      <main class="container">
        <nav>
          <ul style={{ marginLeft: "5%" }}>
            <li>
              <strong>Codify</strong>
            </li>
          </ul>
          {desktopNav}
          {mobileNav}
        </nav>
      </main>
    </article>
  );
}
