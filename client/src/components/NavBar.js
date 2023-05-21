

export default function NavBar() {

    return (
        <nav>
        <ul style={{ marginLeft: "3%" }}>
          <li>
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