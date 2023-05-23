import { useContext } from "react";
import { Route, Routes, useNavigate} from "react-router-dom";
import { UserContext } from "../App";
import ProjectCard from "../ProjectCard";
import EditProject from "./EditProject";

export default function ProjectsPage() {
  const { projects } = useContext(UserContext);

  const navigate = useNavigate()

  function handleEdit(project){
      navigate(`/admin/projects-page/${project.id}`)
  }

  const projectList = projects.map((project) => {
    return (
      <div key={project.url}>
        <ProjectCard key={project.id} project={project} />
        <br />
        <button className="button" onClick={() => handleEdit(project)}>Edit</button>
        <br />
      </div>
    );
  });

  return (
    <>
      <h1>Project page</h1>
      <Routes>
        <Route path=":projectId" element={<EditProject />} />
      </Routes>
      {projectList}
    </>
  );
}
