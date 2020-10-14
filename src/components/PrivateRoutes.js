import React from "react";
import { Router } from "@reach/router";
import Home from "../Pages/Home";
import ProfilePage from "../Pages/ProfilePage";
import ShowReviews from "../Pages/ShowReviews";
import AllReviews from "../Pages/AllReviews";
import MyReviews from "../Pages/MyReviews";

export default function PrivateRoutes({ setSignedIn, signedIn }) {
  const [showReviews, setShowReviews] = React.useState([]);
  return (
    <Router>
      <Home
        path="/home"
        setSignedIn={setSignedIn}
        signedIn={signedIn}
        setShowReviews={setShowReviews}
      />
      <ProfilePage path="/profile" signedIn={signedIn} />
      <ShowReviews
        path="/showreviews"
        showReviews={showReviews}
        signedIn={signedIn}
      />
      <AllReviews path="/allreviews" signedIn={signedIn} />
      <MyReviews path="/myreviews" signedIn={signedIn} />
    </Router>
  );
}
