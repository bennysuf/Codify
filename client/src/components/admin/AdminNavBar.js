import { useContext } from "react";
import { UserContext } from "../App";
import { AdminContext } from "./Admin";
import { Link } from "react-router-dom";

export default function AdminNavBar() {
  const path = window.location.pathname;

  const { setAdmin } = useContext(UserContext);
  const { setProjects } = useContext(AdminContext);

  // TODO: fix navbar to top
  // TODO: create dynamic navbars 

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      setAdmin(null);
      setProjects([]);
    });
  }

  return (
    <body>
      <main class="container">
        <nav>
          <ul style={{ marginLeft: "5%" }}>
            <li>
              <strong>Codify</strong>
            </li>
          </ul>
          <ul style={{ marginRight: "3%" }}>
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
          </ul>
        </nav>
      </main>
    </body>
  );
}
