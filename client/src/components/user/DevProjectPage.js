import { useContext } from "react";
import { UserContext } from "../App";
import ProjectCard from "../ProjectCard";

export default function DevProjectPage() {
  const { currentDev } = useContext(UserContext);

  // ! page will show old projects until page is reloaded

  const projects = currentDev[0].projects.map((project) => (
    <div key={project.id}>
      <ProjectCard key={project.id} project={project} />
      <br />
    </div>
  ));

  return <div style={{marginTop: "20px"}}>{projects}</div>;
}
