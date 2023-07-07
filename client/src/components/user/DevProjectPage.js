import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import ProjectCard from "../ProjectCard";

export default function DevProjectPage() {
  const [projects, setProjects] = useState([]);
  const { currentDev } = useContext(UserContext);

  useEffect(() => {
    fetch(`/projects/${currentDev.id}`)
      .then((r) => r.json())
      .then((d) => setProjects(d));
  }, []);

  const projectList = projects.map((project) => {
    return (
      <div key={project.id}>
        <ProjectCard key={project.id} project={project} collabs={project.collaborations}/>
        <br />
      </div>
    );
  });

  return <div>{projectList}</div>;
}
