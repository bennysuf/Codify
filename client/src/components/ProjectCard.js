export default function ProjectCard({ project }) {
  const { title, url, description, linkText } = project;

  // TODO: need to check if "https://" is in the url, else add it href={"https://" + url}

  return (
    <article className="card">
      <header>Title: {title}</header>
      <h4>
        Link:{" "}
        <a href={"https://" + url} target="_blank" rel="noreferrer">
          {linkText}
        </a>
      </h4>
      <p>Description: {description}</p>
    </article>
  );
}
