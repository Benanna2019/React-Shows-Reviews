import React from "react";
import axios from "axios";

import Review from "../components/Review";

export default function AllReviews({ signedIn }) {
  const [allReviews, setAllReviews] = React.useState([]);
  React.useEffect(() => {
    (async function () {
      try {
        axios.get("http://localhost:4000/all-reviews").then((resp) => {
          console.log(resp.data[0]);
          setAllReviews(resp.data[0]);
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div style={style.reviews}>
      {allReviews.map((review) => (
        <Review review={review} signedIn={signedIn} />
      ))}
    </div>
  );
}

const style = {
  reviews: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
};
