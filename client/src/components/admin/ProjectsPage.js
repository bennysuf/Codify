import { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../App";
import ProjectCard from "../ProjectCard";
import EditProject from "./EditProject";

export default function ProjectsPage() {
  const [projectProp, setProjectProp] = useState("");
  const { projects, navigate } = useContext(UserContext);

  function handleEdit(project) {
    setProjectProp(project);
    navigate(`/admin/projects-page/${project.id}`);
  }

  const projectList = projects.map((project) => {
    return (
      <div key={project.url.link}>
        <ProjectCard key={project.id} project={project} />
        <br />
        <button className="button" onClick={() => handleEdit(project)}>
          Edit
        </button>
        <br />
        {window.scrollTo(0, 0)}
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
