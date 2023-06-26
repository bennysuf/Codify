import { useState, useContext, useEffect } from "react";
import { UserContext } from "../App";

export default function NewProject() {
  const { projects, setProjects, navigate, devs } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [webText, setWebText] = useState("");
  const [description, setDescription] = useState("");
  const [added, setAdded] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const [errors, setErrors] = useState([]);

  function handleCollabAdd(dev) {
    if (!collaborators.find((user) => user === dev)) {
      setCollaborators([...collaborators, dev]);
      setAdded("Added");
    }
  }

  function handleCollabRemoval(dev) {
    setCollaborators(collaborators.filter((user) => user !== dev));
    setAdded("Removed");
  }

  useEffect(() => {
    setTimeout(() => {
      setAdded("");
    }, 750);
  }, [collaborators]);

  function handleSubmit(e) {
    e.preventDefault();
    const created = {
      title: title,
      url: url,
      linkText: webText,
      description: description,
    };
    fetch("/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(created),
    }).then((r) => {
      if (r.ok) {
        debugger;
        r.json().then((newProject) => {
          if (collaborators[0]) {
            collaborators.forEach((dev) => {
              fetch("/collaborations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  dev,
                  project_id: newProject.id,
                }),
              }).then((r) => {
                if (r.ok) {
                  r.json().then((d) => console.log("colab fetch", d));
                }
              });
            });
          }
          setProjects([newProject, ...projects]);
        });
        navigate("/admin/projects-page");
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            placeholder="Website"
            value={webText}
            onChange={(e) => setWebText(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ height: "100px" }}
          />
          <div class="grid">
            <details role="list">
              <summary aria-haspopup="listbox" role="button">
                Collaborators
              </summary>
              <ul role="listbox">
                {collaborators.map((dev) => {
                  return (
                    <li key={dev} onClick={() => handleCollabRemoval(dev)}>
                      Remove {dev}
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
                  return (
                    <li
                      key={dev.id}
                      onClick={() => handleCollabAdd(dev.username)}
                    >
                      {dev.username}
                    </li>
                  );
                })}
              </ul>
            </details>
          </div>
        </div>
        <button type="submit" className="button">
          Submit
        </button>
        <br />
        <div style={{ textAlign: "center" }}>{added}</div>
      </form>
    </>
  );
}
