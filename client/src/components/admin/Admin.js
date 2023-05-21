import React, { Routes, Route, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { UserContext } from "../App";
import EditAboutPage from "./EditAdmin";
import NewProject from "./NewProject";
import AdminNavBar from "./AdminNavBar";
import ProjectsPage from "./ProjectsPage";

export default function Admin() {
  const { admin } = useContext(UserContext);

  const [projects, setProjects] = useState(admin.projects);

  console.log("Admin", admin);

  return (
    <>
      <Logout />
      <AdminNavBar />
      {admin.username}
      <Routes>
        <Route path="/about" element={EditAboutPage}/>
        <Route path="/new-project" element={<NewProject projects={projects} setProjects={setProjects}/>} />
        <Route path="/projects-page" element={<ProjectsPage projects={projects}/>} />
      {/* routes for all edit components */}
      </Routes>
    </>
  );
}
