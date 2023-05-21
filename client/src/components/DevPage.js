import { useEffect, useState, useContext } from "react";
import { UserContext } from "./App";
import ProjectCard from "./ProjectCard";
import DevNavBar from "./DevNavBar";

export default function DevPage() {
  const { currentDev } = useContext(UserContext);
  
  const projects = currentDev[0].projects.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ));

  return (
    <>
      <DevNavBar />
      <h3>DevPage</h3>
      {projects}
    </>
  );
}
