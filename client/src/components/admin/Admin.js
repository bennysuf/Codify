import React, { useState, useContext } from "react";
import { useParams, Routes, Route } from "react-router-dom";
import Logout from "./Logout";
import { UserContext } from "../App";
import EditAdmin from "./EditAdmin";
import NewProject from "./NewProject";
import AdminNavBar from "./AdminNavBar";
import ProjectsPage from "./ProjectsPage";
import CreateProfile from "./CreateProfile";

export default function Admin() {
  const [about, setAbout] = useState(false);
  const { admin } = useContext(UserContext);

  const { profile, username } = admin;

  const { projectId } = useParams();

  // function Home() {
  //   return window.location.href;
  // }

  // console.log("URL", Home())

  function handleClick() {
    setAbout(!about);
    //TODO: grab param, if its not admin then dont show button
  }

  return (
    <>
      <Logout />
      <AdminNavBar profile={admin.profile}/>
      {username}
      <button onClick={handleClick} className="button">
        See about me
      </button>
      <br />
      {about ? (
        <textarea
          defaultValue={profile ? profile.about : "Add about me"}
          style={{ height: "400px" }}
        />
      ) : (
        ""
      )}
      <Routes>
        <Route path="edit-admin" element={<EditAdmin />} />
        <Route path="create-profile" element={<CreateProfile />} />
        <Route path="new-project" element={<NewProject />} />
        <Route path="projects-page/*" element={<ProjectsPage />} />
      </Routes>
    </>
  );
}
