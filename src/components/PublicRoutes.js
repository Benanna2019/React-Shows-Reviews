import React from "react";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import ConfirmSignUp from "../Pages/ConfirmSignUp";
import { Router } from "@reach/router";

export default function PublicRoutes() {
  return (
    <Router>
      <SignIn path="/" />
      <SignUp path="/signup" />
      <ConfirmSignUp path="/confirm" />
    </Router>
  );
}
