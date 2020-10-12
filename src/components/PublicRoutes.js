import React from "react";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import ConfirmSignUp from "../Pages/ConfirmSignUp";
import { Router } from "@reach/router";

export default function PublicRoutes() {
  const [username, setUsername] = React.useState(undefined)
  return (
    <Router>
      <SignIn path="/" />
      <SignUp setUsername={setUsername} path="/signup" />
      <ConfirmSignUp username={username} path="/confirm" />
    </Router>
  );
}
