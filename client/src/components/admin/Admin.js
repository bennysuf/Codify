import React, { useState, useContext } from "react";
import { useParams, Routes, Route } from "react-router-dom";
import Logout from "./Logout";
import { UserContext } from "../App";
import EditAdmin from "./EditAdmin";
import NewProject from "./NewProject";
import AdminNavBar from "./AdminNavBar";
import ProjectsPage from "./ProjectsPage";

export default function Admin() {
  const [about, setAbout] = useState(false)
  const { admin } = useContext(UserContext);

  const { projectId } = useParams();

  console.log("Admin", projectId);

  function Home() {return window.location.href}

  console.log("URL", Home())

  function handleClick(){
    setAbout(!about);
    //TODO: grab param, if its not admin then dont show button
  }

  return (
    <>
      <Logout />
      <AdminNavBar />
      {admin.username}
      <button onClick={handleClick} className="button">See about me</button>
      <br/>
      {about ? (
         <textarea defaultValue={admin.profile.about} style={{ height: "400px" }} />
      ) : (
        ""
      )}
      <Routes>
        <Route path="edit-admin" element={<EditAdmin />} />
        <Route path="new-project" element={<NewProject />} />
        <Route path="projects-page/*" element={<ProjectsPage />} />
      </Routes>
    </>
  );
}
