import { useState, useContext } from "react";
import { UserContext } from "../App";

export default function NewProject() {
  const { projects, setProjects, navigate } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState({ link: "", website: "" });
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  console.log("new project", url);
  // ! state gets updated but upon reload, card comes back with no url

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
      navigate("/admin/projects-page");
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Link"
            value={url.link}
            onChange={(e) =>
              setUrl({
                ...url,
                link: e.target.value,
              })
            }
          />
          <input
            placeholder="Website"
            value={url.website}
            onChange={(e) =>
              setUrl({
                ...url,
                website: e.target.value,
              })
            }
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
        {errors.map((err) => (
          <h5 className="input" key={err}>
            {err}
          </h5>
        ))}
      </form>
    </>
  );
}

//! http://localhost:4000/admin/index.css 404 (Not Found)
