import { useContext } from "react"
import { UserContext } from "../App"
import {useNavigate } from "react-router-dom";

export default function Logout(){

    const {setAdmin} = useContext(UserContext)

    let navigate = useNavigate()

    function handleLogout(){
        fetch("logout", {
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