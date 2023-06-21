import { useContext } from "react";
import { UserContext } from "../App";
import ProjectCard from "../ProjectCard";

export default function DevProjectPage() {
  const { currentDev } = useContext(UserContext);

  const projects = currentDev.ordered_projects.map((project) => (
    <div key={project.id}>
      <ProjectCard key={project.id} project={project} />
      <br />
    </div>
  ));

  return <div style={{marginTop: "20px"}}>{projects}</div>;
}
