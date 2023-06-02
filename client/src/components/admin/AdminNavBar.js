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
          <a href="/admin" className={path === "/admin" ? "secondary" : ""}>
            Home
          </a>
        </li>
        <li key="projects-page">
          <a
            href="/admin/projects-page"
            className={path === "/admin/projects-page" ? "secondary" : ""}
          >
            Projects
          </a>
        </li>
        <li key="new-project">
          <a
            href="/admin/new-project"
            className={path === "/admin/new-project" ? "secondary" : ""}
          >
            New project
          </a>
        </li>
        <li key="about">
          <a
            href={"/admin/edit-admin"}
            className={path === "/admin/edit-admin" ? "secondary" : ""}
          >
            Edit profile
          </a>
        </li>
      </ul>
    </nav>
  );
}
