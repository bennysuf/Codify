// import { useNavigate } from "react-router-dom"

export default function NavBar() {

  // const navigate = useNavigate()

  // function handlePathChange() {
  //   console.log("click")
  //   navigate("/home")
  // }

    return (
        <nav>
        <ul style={{ marginLeft: "5%" }}>
          <li >
            <strong>Codify</strong>
          </li>
        </ul>
        <ul style={{marginRight: "3%"}}>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/login">Dev Login</a>
          </li>
          <li>
            <a href="/signup">Dev Signup</a>
          </li>
        </ul>
      </nav>
    )
}