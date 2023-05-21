import { Link } from "react-router-dom";
export default function ProjectCard({ project }) {
  const { title, url, description } = project;

  //TODO: need to check if "https://" is in the url, else add it href={"https://" + url}
  // TODO: add dynamic name change for url

  return (
    <article>
      <h1>Title: {title}</h1>
      <h1>
        Link:{" "}
        <a href={"https://" + url} target="_blank" rel="noreferrer">
          {url}
        </a>
      </h1>
      <p>Description: {description}</p>
    </article>
  );
}
