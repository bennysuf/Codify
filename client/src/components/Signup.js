import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./App";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const { setAdmin } = useContext(UserContext);

  const navigate = useNavigate();

  function handleUsername(e) {
    e.preventDefault();
    setUsername(e.target.value);
  }

  function handlePassword(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  function handleConfirmation(e) {
    e.preventDefault();
    setConfirmation(e.target.value);
  }
  function handleEmail(e) {
    e.preventDefault();
    setEmail(e.target.value);
  }

  function handleSignup() {
    fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        password_confirmation: confirmation,
        email: email,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setAdmin(user);
          navigate(`/admin/edit-admin`);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <>
      <nav style={{marginTop: "3%"}}>
        <ul style={{ marginLeft: "3%" }}>
          <li>
            <strong>Codify</strong>
          </li>
        </ul>
        <ul style={{ marginRight: "3%" }}>
          <li key="home">
            <Link to="/home">Home</Link>
          </li>
        </ul>
      </nav>
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
          type="text"
          id="email"
          placeholder="email"
          value={email}
          onChange={handleEmail}
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
        <input
          type="password"
          id="confirmation"
          placeholder="confirmation"
          value={confirmation}
          onChange={handleConfirmation}
        />
        <br />
        <button type="button" onClick={handleSignup}>
          Signup
        </button>
        <br />
        <Link to="/login">{"Login"}</Link>
        {errors.map((err) => (
          <h4 key={err}>{err}</h4>
        ))}
      </div>
    </>
  );
}
