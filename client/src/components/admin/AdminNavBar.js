
export default function AdminNavBar(){

     //if current page, make <a> class="secondary" else "" 

    return (
        <nav aria-label="breadcrumb">
        <ul>
          <li key="about">
            <a href="/about" >Edit about</a>
          </li>
          <li key="new-project">
            <a href="/new-project">New project</a>
          </li>
          <li key="projects-page">
            <a href="/projects-page">Projects</a>
          </li>
        </ul>
      </nav>
    )
}