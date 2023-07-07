import React, {useState, useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import EditAdmin from "./EditAdmin";
import NewProject from "./NewProject";
import AdminNavBar from "./AdminNavBar";
import ProjectsPage from "./ProjectsPage";

export default function Admin({admin}) {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch(`/projects/${admin.id}`)
      .then((r) => r.json())
      .then((d) => setProjects(d));
  }, []);

  return (
    <div>
      <div className="hide-on-mobile">
      <AdminNavBar />
      </div>
      <Routes>
        <Route path="edit-admin" element={<EditAdmin />} />
        <Route path="new-project" element={<NewProject projects={projects} setProjects={setProjects}/>} />
        <Route path="projects-page/*" element={<ProjectsPage projects={projects} setProjects={setProjects}/>} />
      </Routes>
    </div>
  );
}
