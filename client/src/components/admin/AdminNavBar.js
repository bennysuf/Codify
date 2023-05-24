export default function AdminNavBar({ profile }) {

  const param = profile ? "edit-admin" : "create-profile";
 
  //if current page, make <a> class="secondary" else ""

  return (
    <nav aria-label="breadcrumb">
      <ul style={{ marginLeft: "3%" }}>
        <li key="about">
          <a href={"/admin/" + param}>Edit admin</a>
        </li>
        <li key="new-project">
          <a href="/admin/new-project">New project</a>
        </li>
        <li key="projects-page">
          <a href="/admin/projects-page">Projects</a>
        </li>
        <li key="admin">
          <a href="/admin">Home</a>
        </li>
      </ul>
    </nav>
  );
}
