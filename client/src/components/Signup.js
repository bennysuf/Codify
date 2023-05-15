import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup({setAdmin}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

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
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
            setAdmin(user);
            // navigate to admin$/${dev_username}
        })
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  console.log("err", errors)

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
      <Link to="/">{"Login"}</Link>
      {errors.map((err) => (
        <h4 key={err}>{err}</h4>
      ))}
    </div>
  );
}
