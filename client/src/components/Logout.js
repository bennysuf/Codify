import { useContext } from "react"
import { UserContext } from "./App"
import {useNavigate } from "react-router-dom";
import api from "../api";

export default function Logout(){

    const {setAdmin} = useContext(UserContext)

    let navigate = useNavigate()

    function handleLogout(){
        api("logout", {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(() => {
            setAdmin(null)
            navigate("/home")
            // reset states
        })
    }

    return (
      <button onClick={handleLogout}>Logout</button>
    )
}