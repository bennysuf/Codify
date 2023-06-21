import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./App";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const { setAdmin, navigate, setReload } = useContext(UserContext);

  function handleLogin() {
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setAdmin(user);
          setReload("reload");
          navigate(`/admin/projects-page`);
        });
      } else {
        r.json().then((err) => setErrors(err.error));
      }
    });
  }

  return (
    <>
      <nav style={{ marginTop: "3%" }}>
        <ul style={{ marginLeft: "3%" }}>
          <li>
            <strong>Codify</strong>
          </li>
        </ul>
        <ul style={{ marginRight: "3%" }}>
          <li key="home">
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <div className="input" style={{ marginTop: "10%" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <br />
        <Link to="/signup">{"Signup"}</Link>
        {<h4 key={errors}>{errors}</h4>}
      </div>
    </>
  );
}
