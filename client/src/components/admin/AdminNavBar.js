import { Link } from "react-router-dom";

export default function AdminNavBar() {
  const path = window.location.pathname;

  return (
    <nav>
    {/* <nav aria-label="breadcrumb"> */}
      <ul style={{ marginLeft: "5%" }}>
      <li >
            <strong>Codify</strong>
          </li>
        </ul>
        <ul style={{marginRight: "3%"}}>
        <li key="admin">
          <Link to="/admin" className={path === "/admin" ? "secondary" : ""}>
            Home
          </Link>
        </li>
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
            to={"/admin/edit-admin"}
            className={path === "/admin/edit-admin" ? "secondary" : ""}
          >
            Edit profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}
