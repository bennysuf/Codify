export default function ProjectCard({ project }) {
  const { title, url, description } = project;

  const { link, website} = url
  
  // TODO: need to check if "https://" is in the url, else add it href={"https://" + url}
  // TODO: make URL a hash in backend with url and website

  return (
    <article className="card">
      <header>Title: {title}</header>
      <h4>
        Link:{" "}
        {/* <a href={"https://" + url} target="_blank" rel="noreferrer"> */}
        <a href={"https://" + link} target="_blank" rel="noreferrer">
          {website}
          {/* {url} */}
        </a>
      </h4>
      <p>Description: {description}</p>
    </article>
  );
}
