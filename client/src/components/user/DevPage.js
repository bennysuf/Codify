import { useContext } from "react";
import { UserContext } from "../App";
import ProjectCard from "../ProjectCard";
import DevNavBar from "./DevNavBar";

export default function DevPage() {
  const { currentDev } = useContext(UserContext);
  
  const projects = currentDev[0].projects.map((project) => (
    <div key={project.url}>
    <ProjectCard key={project.id} project={project} />
    <br/>
    </div>
  ));

  return (
    <>
      <DevNavBar />
      <h3>DevPage</h3>
      {projects}
    </>
  );
}
