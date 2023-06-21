import React from "react";
import { Routes, Route } from "react-router-dom";
import EditAdmin from "./EditAdmin";
import NewProject from "./NewProject";
import AdminNavBar from "./AdminNavBar";
import ProjectsPage from "./ProjectsPage";
import CreateProfile from "./CreateProfile";

export default function Admin() {

  return (
    <div style={{marginTop: "3%"}}>
      <AdminNavBar />
      <Routes>
        <Route path="edit-admin" element={<EditAdmin />} />
        <Route path="create-profile" element={<CreateProfile />} />
        <Route path="new-project" element={<NewProject />} />
        <Route path="projects-page/*" element={<ProjectsPage />} />
      </Routes>
    </div>
  );
}
