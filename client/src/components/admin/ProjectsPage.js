import { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../App";
import ProjectCard from "../ProjectCard";
import EditProject from "./EditProject";

export default function ProjectsPage({ projects, setProjects }) {
  const [projectProp, setProjectProp] = useState("");
  const { navigate, admin } = useContext(UserContext);

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
            element={
              <EditProject
                project={projectProp}
                projects={projects}
                updateProjects={setProjects}
              />
            }
          />
        </Routes>
        {projectList}
      </main>
    </body>
  );
}
