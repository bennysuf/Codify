import { useContext, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { UserContext } from "../App";
import { AdminContext } from "./Admin";
import ProjectCard from "../ProjectCard";
import EditProject from "./EditProject";

export default function ProjectsPage() {
  const [projectProp, setProjectProp] = useState("");
  const { navigate } = useContext(UserContext);
  const { projects } = useContext(AdminContext);

  function handleEdit(project) {
    setProjectProp(project);
    window.scrollTo(0, 0);
    navigate(`/admin/projects-page/${project.id}`);
  }

  const projectList = projects.map((project) => {
    return (
      <div key={project.id}>
        <ProjectCard
          key={project.id}
          project={project}
          collabs={project.collaborations}
        />
        <br />
        <button className="button" onClick={() => handleEdit(project)}>
          Edit
        </button>
        <br />
      </div>
    );
  });

  return (
    <body>
      <main class="container">
        <Routes>
          <Route
            path=":projectId"
            element={<EditProject projectProp={projectProp} />}
          />
        </Routes>
        {projectList}
      </main>
    </body>
  );
}
