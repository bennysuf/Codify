import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";

export default function EditProject({ project }) {
  const { projects, setProjects, navigate } = useContext(UserContext);

  const { projectId } = useParams();

  const currentProject = projects.filter(
    (project) => project.id === parseInt(projectId)
  );

  const { description, title, url, linkText } = currentProject[0];

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newUrl, setNewUrl] = useState(url);
  const [newWebText, setNewWebText] = useState(linkText ? linkText : "");

  function handleSubmit(e) {
    e.preventDefault();
    const update = {
      title: newTitle,
      url: newUrl,
      linkText: newWebText,
      description: newDescription,
    };
    fetch(`/projects/${projectId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    }).then((r) => {
      if (r.ok) {
        r.json().then((d) => {
          const updated = projects.map((project) => {
            return project.id !== d.id ? project : d;
          });
          setProjects(updated);
          navigate("/admin/projects-page");
        });
      }
    });
  }

  function handleDelete(item) {
    fetch(`/projects/${projectId}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updated = projects.filter((project) => project.id !== item.id);
        setProjects(updated);
        navigate("/admin/projects-page");
      });
  }

  return (
    <>
      <h3>Edit projects page</h3>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <input
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            placeholder="Link"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
          <input
            placeholder="Website"
            value={newWebText}
            onChange={(e) => setNewWebText(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            style={{ height: "100px" }}
          />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => handleDelete(project)}>
          Delete project
        </button>
      </form>
    </>
  );
}
