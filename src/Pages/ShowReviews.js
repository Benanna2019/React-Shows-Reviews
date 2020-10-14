import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Review from "../components/Review";

export default function ShowReviews({ showReviews, signedIn }) {
  return (
    <div>
      {showReviews.map((review) => (
        <Review review={review} signedIn={signedIn} />
      ))}
    </div>
  );
}
