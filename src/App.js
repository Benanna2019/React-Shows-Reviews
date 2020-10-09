import React, { useState } from "react";
import PublicRoutes from "./components/PublicRoutes";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <div>
      {signedIn ? (
        <PrivateRoutes />
      ) : (
        <PublicRoutes setSignedIn={setSignedIn} />
      )}
    </div>
  );
}

export default App;
