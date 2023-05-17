import Logout from "./Logout";
import { useState, useContext } from "react";
import { UserContext } from "./App";

export default function Admin() {
  const { admin } = useContext(UserContext);

  return (
    <>
      {admin.username}
      <Logout />
    </>
  );
}
