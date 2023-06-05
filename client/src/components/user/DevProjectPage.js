import { useContext } from "react";
import { UserContext } from "../App";
import ProjectCard from "../ProjectCard";

export default function DevProjectPage() {
  const { currentDev } = useContext(UserContext);

  const projects = currentDev[0].projects.map((project) => (
    <div key={project.url.link}>
      <ProjectCard key={project.id} project={project} />
      <br />
    </div>
  ));

  return <div>{projects}</div>;
}
