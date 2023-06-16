import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Logout from "./Logout";
import { UserContext } from "../App";
import EditAdmin from "./EditAdmin";
import NewProject from "./NewProject";
import AdminNavBar from "./AdminNavBar";
import ProjectsPage from "./ProjectsPage";
import CreateProfile from "./CreateProfile";

export default function Admin() {
  const { admin } = useContext(UserContext);

  const { username } = admin;

  return (
    <div style={{marginTop: "3%"}}>
      <Logout />
      <AdminNavBar />
      {username}
      <Routes>
        <Route path="edit-admin" element={<EditAdmin />} />
        <Route path="create-profile" element={<CreateProfile />} />
        <Route path="new-project" element={<NewProject />} />
        <Route path="projects-page/*" element={<ProjectsPage />} />
      </Routes>
    </div>
  );
}
