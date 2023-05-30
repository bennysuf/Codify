export default function AdminNavBar() {

  // TODO: if current page, make <a> class="secondary" else ""

  return (
    <nav aria-label="breadcrumb">
      <ul style={{ marginLeft: "3%" }}>
        <li key="admin">
          <a href="/admin">Home</a>
        </li>
        <li key="projects-page">
          <a href="/admin/projects-page">Projects</a>
        </li>
        <li key="new-project">
          <a href="/admin/new-project">New project</a>
        </li>
        <li key="about">
          <a href={"/admin/edit-admin"}>Edit profile</a>
        </li>
      </ul>
    </nav>
  );
}
