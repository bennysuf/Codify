import { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { setAdmin, setProjects } = useContext(UserContext);

  let navigate = useNavigate();

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      setAdmin(null);
      navigate("/home");
      setProjects([])
    });
  }

  return (
    <button
      onClick={handleLogout}
      style={{ float: "right", marginTop: "10px", width: "20%" }}
    >
      Logout
    </button>
  );
}
