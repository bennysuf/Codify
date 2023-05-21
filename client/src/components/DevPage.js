import { useEffect, useContext, useState } from "react";
import ProjectCard from "./ProjectCard";
// import { UserContext } from "./App";

export default function DevPage({ dev }) {
  const [currentDev, setCurrentDev] = useState({ username: "Loading..." });

  useEffect(() => {
    setCurrentDev(dev);
  }, []);

  const projects = dev.projects.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ));

  return (
    <>
      <nav aria-label="breadcrumb">
        <ul>
          <li key="about">
            <a href={"/about?developers=" + dev.username}>About</a>
          </li>
          <li key="contact">
            <a href={"/contact?developers=" + dev.username}>Contact</a>
          </li>
          <li key="resume">
            <a
              href={"https://" + dev.profile.resume}
              target="_blank"
              rel="noreferrer"
            >
              Resume
            </a>
          </li>
        </ul>
      </nav>
      <h3>DevPage</h3>
      {currentDev?.username}
      {projects}
    </>
  );
}
