import React from "react";
import Navbar from "../components/Navbar";

export default function Home({ setSignedIn }) {
  return (
    <div>
      <Navbar setSignedIn={setSignedIn} />
    </div>
  );
}
