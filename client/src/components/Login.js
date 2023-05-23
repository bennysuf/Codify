import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./App";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const {setAdmin} = useContext(UserContext)

  let navigate = useNavigate()

  function handleUsername(e) {
    e.preventDefault();
    setUsername(e.target.value);
  }

  function handlePassword(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

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
          navigate(`/admin`)
          // navigate(`/admin/${user.username}`)
        });
      } else {
        r.json().then((err) => setErrors(err.error));
      }
    });
  }

  return (
    <div className="input" style={{ marginTop: "10%" }}>
      <input
        type="text"
        id="username"
        placeholder="Username"
        value={username}
        onChange={handleUsername}
      />
      <br />
      <input
        type="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={handlePassword}
      />
      <br />
      <button type="button" onClick={handleLogin}>
        Login
      </button>
      <br />
      <Link to="/signup">{"Signup"}</Link>
      {<h4 key={errors}>{errors}</h4>}
    </div>
  );
}
