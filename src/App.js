import React, { useState } from "react";
import PublicRoutes from "./components/PublicRoutes";
import PrivateRoutes from "./components/PrivateRoutes";
import Navbar from "./components/Navbar";
import { Auth } from "aws-amplify";

function App() {
  const [signedIn, setSignedIn] = useState(undefined);
  React.useEffect(() => {
    (async function () {
      try {
        setSignedIn(await Auth.currentAuthenticatedUser());
      } catch (error) {
        setSignedIn(undefined);
      }
    })();
  }, []);
  console.log(signedIn);
  return (
    <div>
      {signedIn ? console.log(signedIn.signInUserSession.idToken.jwtToken) : ""}
      {signedIn ? (
        <>
          <Navbar setSignedIn={setSignedIn} />
          <PrivateRoutes setSignedIn={setSignedIn} signedIn={signedIn} />
        </>
      ) : (
        <PublicRoutes setSignedIn={setSignedIn} />
      )}
    </div>
  );
}

export default App;
