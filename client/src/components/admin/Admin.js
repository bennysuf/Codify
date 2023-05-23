import React, { useState, useContext } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Logout from "./Logout";
import { UserContext } from "../App";
import EditAdmin from "./EditAdmin";
import NewProject from "./NewProject";
import AdminNavBar from "./AdminNavBar";
import ProjectsPage from "./ProjectsPage";

export default function Admin() {
  const { admin } = useContext(UserContext);

  //? move routes to admin and add admin context

  return (
    <>
      <Logout />
      <AdminNavBar />
      {admin.username}
      <Routes>
        <Route path="edit-admin" element={<EditAdmin />} />
        <Route path="new-project" element={<NewProject />} />
        <Route path="projects-page/*" element={<ProjectsPage />} />
      </Routes>
    </>
  );
}
