import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";
import { AdminContext } from "./Admin";

export default function EditProject({ projectProp }) {
  const { navigate, devs, admin } = useContext(UserContext);
  const { projects, setProjects, setReload } = useContext(AdminContext);
  const [project, setProject] = useState(projectProp);

  const { projectId } = useParams();

  useEffect(() => {
    setProject(projectProp);
    fetch(`/get-project/${projectId}`)
      .then((r) => r.json())
      .then((d) => setProject(d));
  }, [projectProp]);

  const { description, title, url, linkText, collaborations } = project;

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newUrl, setNewUrl] = useState(url);
  const [newWebText, setNewWebText] = useState(linkText);
  const [newCollaborators, setNewCollaborators] = useState(collaborations);
  const [errors, setErrors] = useState([]);
  const [added, setAdded] = useState("");

  useEffect(() => {
    setNewTitle(title);
    setNewDescription(description);
    setNewUrl(url);
    setNewWebText(linkText);
    setNewCollaborators(collaborations);
  }, [project]);

  function handleCollabAdd(dev) {
    if (!newCollaborators.find((user) => user.dev_username === dev)) {
      const collabDev = devs.find((d) => d.username === dev);
      const newCollab = {
        dev_username: collabDev.username,
      };
      setNewCollaborators([...newCollaborators, newCollab]);
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

    const validUrl = newUrl.includes("https://" || "http://")
      ? newUrl
      : "https://" + newUrl;

    const update = {
      title: newTitle,
      url: validUrl,
      linkText: newWebText,
      description: newDescription,
    };
    const collabs = [];

    fetch(`/projects/${projectId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    }).then((r) => {
      if (r.ok) {
        r.json().then((updatedProject) => {
          // const updated = projects.map((project) => {
          //   return project.id !== updatedProject.id ? project : updatedProject;
          // });
          if (newCollaborators[0]) {
            newCollaborators.forEach((dev) => {
              fetch("/collaborations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  dev: dev.dev_username,
                  project_id: updatedProject.id,
                }),
              }).then((r) => {
                if (r.ok) {
                  r.json().then((d) => {
                    // collabs.push(d)
                    // updatedProject.collaborations = collabs
                    setReload(d.dev_username);
                    // setProjects(updated);
                  });
                }
              });
            });
            // } else {
            // setProjects(updated);
          }
          setReload("reload");
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
        setProjects(updated);
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
          <label>
            Project name
            <input
              placeholder="Project name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </label>
          <label>
            URL
            <input
              placeholder="i.e. github/project.com"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
          </label>
          <label>
            URL title
            <input
              placeholder="i.e. Github, Demo"
              value={newWebText}
              onChange={(e) => setNewWebText(e.target.value)}
            />
          </label>
          <label>
            Description
            <textarea
              placeholder="Project description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              style={{ height: "100px" }}
            />
          </label>
          <div class="grid">
            <details role="list">
              <summary aria-haspopup="listbox" role="button">
                Collaborators
              </summary>
              <ul role="listbox">
                {newCollaborators?.length > 0 ? (
                  newCollaborators?.map((dev) => {
                    return (
                      <li
                        key={dev.dev_username || dev.username}
                        onClick={() => handleCollabRemoval(dev)}
                      >
                        Remove {dev.username || dev.dev_username}
                      </li>
                    );
                  })
                ) : (
                  <li key="key">No collaborators</li>
                )}
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
