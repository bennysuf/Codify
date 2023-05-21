// import { useState, useContext } from "react";
// import { UserContext } from "../App";

export default function ProjectsPage({projects}) {
//   const { admin } = useContext(UserContext);

//   const [projects, setProjects] = useState(admin.projects);

  const projectList = projects((project) => {
    const { title, description, url } = project;

    //button/Link to edit project
  });

  //? use ProjectCard?
  //? nested route?

  return <>{projectList}</>;
}
