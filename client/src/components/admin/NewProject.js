import { useState, useContext } from "react";
import { UserContext } from "../App";

export default function NewProject() {
  const { projects, setProjects, navigate } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [webText, setWebText] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

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
        r.json().then((newProject) => setProjects([newProject, ...projects]));
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
        </div>
        <button type="submit" className="button">
          Submit
        </button>
        <br />
      </form>
    </>
  );
}
