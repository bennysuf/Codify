import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";

export default function EditProject({ project, updateProjects, projects }) {

  console.log("from edit project", projects);

  const { navigate, devs, admin } = useContext(UserContext);

  const { projectId } = useParams();

  const currentProject = projects.find(
    (project) => project.id === parseInt(projectId)
  );

  // console.log("currebt project", currentProject)
  // TODO: fix page reload issue

  const { description, title, url, linkText, collaborations } = currentProject;

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newUrl, setNewUrl] = useState(url);
  const [newWebText, setNewWebText] = useState(linkText);
  const [newCollaborators, setNewCollaborators] = useState(collaborations);
  const [errors, setErrors] = useState([]);
  const [added, setAdded] = useState("");

  useEffect(() =>{
    setNewTitle(title);
    setNewDescription(description);
    setNewUrl(url);
    setNewWebText(linkText);
    setNewCollaborators(collaborations);
  },[project])

  function handleCollabAdd(dev) {
    if (!newCollaborators.find((user) => user === dev)) {
      setNewCollaborators([...newCollaborators, dev]);
      setAdded("Added");
    }
  }

  function handleCollabRemoval(dev) {
    setNewCollaborators(newCollaborators.filter((user) => user.id !== dev.id));
    setAdded("Removed");
  }

  useEffect(() => {
    setTimeout(() => {
      setAdded("");
    }, 750);
  }, [newCollaborators]);

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
        r.json().then((updatedProject) => {
          const updated = projects.map((project) => {
            return project.id !== updatedProject.id ? project : updatedProject;
          });
          if (newCollaborators[0]) {
            newCollaborators.forEach((dev) => {
              fetch("/collaborations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  dev,
                  project_id: updatedProject.id,
                }),
              }).then((r) => {
                if (r.ok) {
                  r.json().then((d) => {
                    updatedProject.collaborations = [d];
                    updateProjects(updated);
                  });
                }
              });
            });
          } else {
            updateProjects(updated);
          }
          navigate("/admin/projects-page");
        });
      } else {
        r.json().then((err) => {
          const arr = [];
          for (const key in err.errors) {
            arr.push(`${key}: ${err.errors[key]}`);
          }
          setErrors(arr);
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
        updateProjects(updated);
        navigate("/admin/projects-page");
      });
  }

  return (
    <>
      {errors.map((err) => (
        <h5 className="input" key={err}>
          {err}
        </h5>
      ))}
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
          <div class="grid">
            <details role="list">
              <summary aria-haspopup="listbox" role="button">
                Collaborators
              </summary>
              <ul role="listbox">
                {newCollaborators.map((dev) => {
                  return (
                    <li key={dev.id} onClick={() => handleCollabRemoval(dev)}>
                      Remove {dev.dev_username}
                    </li>
                  );
                })}
              </ul>
            </details>
            <details role="list">
              <summary aria-haspopup="listbox" role="button">
                {/* //TODO: add search bar, dropdown only shows search.includes */}
                Add collaborators
              </summary>
              <ul role="listbox">
                {devs.map((dev) => {
                  if (dev.username !== admin.username) {
                    return (
                      <li
                        key={dev.id}
                        onClick={() => handleCollabAdd(dev.username)}
                      >
                        {dev.username}
                      </li>
                    );
                  }
                })}
              </ul>
            </details>
          </div>
        </div>
        <button type="submit" className="button">
          Submit
        </button>
        <br />
        <button
          type="button"
          className="button"
          onClick={() => handleDelete(project)}
        >
          Delete project
        </button>
        <div style={{ textAlign: "center" }}>{added}</div>
      </form>
    </>
  );
}
