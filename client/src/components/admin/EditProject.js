import { useState } from "react";

export default function EditProject() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [url, setUrl] = useState();

  function handleTitleChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e) {
    e.preventDefault();
    setDescription(e.target.value);
  }

  function handleUrlChange(e) {
    e.preventDefault();
    setUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const update = {
      title: title,
      url: url,
      description: description,
    };
    // fetch("/projects/:id", {
    // method: "PATCH",
    // headers: {"Content-Type": "application/json"},
    // body: JSON.stringify(update)
    // })
    // .then(r => {
    // if(r.ok){
    // r.json().then(() => {
    // const updated = projects.map(project => {
    // return project.id !== item.id ? project : item;
    // })
    // setProjects(updated)
    // })
    // }
    // })
  }

  function handleDelete(){
//     fetch("/projects/:id", { 
//         method: "DELETE"
//   })
//   .then(r => r.json())
//   .then(() => {
//     const updated = projects.filter(project => project.id !== item.id)
//     setProjects(updated)
//   })
}


  //! need setProjects here and projects, do i add route to Admin, prop drill, or create new useContext?

  return (
    //input fields
    <form onSubmit={handleSubmit}>
    <button type="submit">Submit</button>
    <button type="button" onClick={handleDelete}>Delete project</button>
  </form>
  );
}
