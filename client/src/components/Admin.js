import Logout from "./Logout"
import { useState, useContext } from "react";
import { UserContext } from "./App";


export default function Admin(){
    const {admin, setAdmin} = useContext(UserContext)

    return (
        <>
        {admin.username}
        <Logout />
        </>
        )
}