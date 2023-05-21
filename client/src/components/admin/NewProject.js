import { useState } from "react";

export default function NewProject({ projects, setProjects }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

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
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(created)
    })
    .then(r => {
        if(r.ok){
            r.json().then(() => setProjects([...projects, created]))
        }
    })
   
    
  }

  return (
    // input fields
    <form onSubmit={handleSubmit}>
      <button type="submit"></button>
    </form>
  );
}
