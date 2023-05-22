import { useState, useContext } from "react";
import { UserContext } from "../App";
import AdminNavBar from "./AdminNavBar";

export default function NewProject() {
  const { projects, setProjects } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  function handleTitleChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleUrlChange(e) {
    e.preventDefault();
    setUrl(e.target.value);
  }

  function handleDescriptionChange(e) {
    e.preventDefault();
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const created = {
      title: title,
      url: url,
      description: description,
    };
    fetch("/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(created),
    }).then((r) => {
      if (r.ok) {
        r.json().then(() => setProjects([...projects, created]));
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
      <AdminNavBar />
      <form onSubmit={handleSubmit}>
        <div className="input">
          <input
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
          <input placeholder="Url" value={url} onChange={handleUrlChange} />
          <textarea
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
            style={{ height: "100px" }}
          ></textarea>
        </div>
        <button type="submit" className="button">
          Submit
        </button>
        <br/>
        {errors.map((err) => (
          <h5 className="input" key={err}>{err}</h5>
        ))}
      </form>
    </>
  );
}
