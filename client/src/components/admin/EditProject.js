import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";

export default function EditProject({ project }) {
  const { projects, setProjects, navigate } = useContext(UserContext);

  const { projectId } = useParams();

  const currentProject = projects.filter(
    (project) => project.id === parseInt(projectId)
  );

  const { description, title, url } = currentProject[0];

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newUrl, setNewUrl] = useState(url);

  function handleNewTitleChange(e) {
    e.preventDefault();
    setNewTitle(e.target.value);
  }

  function handleNewDescriptionChange(e) {
    e.preventDefault();
    setNewDescription(e.target.value);
  }

  function handleNewUrlChange(e) {
    e.preventDefault();
    setNewUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const update = {
      title: newTitle,
      url: newUrl,
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
            onChange={handleNewTitleChange}
          />
          <input
            placeholder="Url"
            value={newUrl}
            onChange={handleNewUrlChange}
          />
          <textarea
            placeholder="Description"
            value={newDescription}
            onChange={handleNewDescriptionChange}
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
