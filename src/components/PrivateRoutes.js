import React from "react";
import { Router } from "@reach/router";
import Home from "../Pages/Home";

export default function PrivateRoutes({ setSignedIn }) {
  return (
    <Router>
      <Home path="/home" setSignedIn={setSignedIn} />
    </Router>
  );
}
