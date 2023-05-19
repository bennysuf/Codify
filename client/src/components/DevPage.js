import { useEffect, useContext, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import AboutPage from "./AboutPage";
import { UserContext } from "./App";

export default function DevPage({ dev }) {
  const [currentDev, setCurrentDev] = useState({ username: "Loading..." });

  // console.log("devPage dev", dev);

  useEffect(() => {
    setCurrentDev(dev);
  }, []);

  const projects = dev.projects.map((project) => (
    <ProjectCard project={project} />
  ));
  console.log("devpage resume", dev.profile);
  return (
    <>
      <nav aria-label="breadcrumb">
        <ul>
          <li>
            <a href={"/about?developers=" + dev.username}>About</a>
          </li>
          <li>
            <a href={"/contact?developers=" + dev.username}>Contact</a>
          </li>
          <li>
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
      <Routes>
        <Route
          path={"/about?developers=" + dev.username}
          elements={AboutPage}
        />
      </Routes>
    </>
  );
}
