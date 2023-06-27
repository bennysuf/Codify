import { useContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../App";
import ProjectCard from "../ProjectCard";
import EditProject from "./EditProject";

export default function ProjectsPage() {
  const [projectProp, setProjectProp] = useState("");
  const [projects, setProjects] = useState([])
  const { navigate, admin } = useContext(UserContext);

  function handleEdit(project) {
    setProjectProp(project);
    // ? project to edit doesnt change till page reload
    window.scrollTo(0, 0)
    navigate(`/admin/projects-page/${project.id}`);

  }

  useEffect(() => {
    fetch(`/projects/${admin.id}`)
      .then((r) => r.json())
      .then((d) => setProjects(d));
  }, []);

  const projectList = projects.map((project) => {
    return (
      <div key={project.url.link}>
        <ProjectCard key={project.id} project={project} collabs={project.collaborations}/>
        <br />
        <button className="button" onClick={() => handleEdit(project)}>
          Edit
        </button>
        <br />
      </div>
    );
  });

  return (
    <div style={{marginTop: "20px"}}>
      <Routes>
        <Route
          path=":projectId"
          element={<EditProject project={projectProp} />}
        />
      </Routes>
      {projectList}
    </div>
  );
}
