import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default function ShowReviews({ showReviews, signedIn }) {
  const [following, setFollowing] = React.useState([]);
  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const response = await axios.post(
          "http://localhost:4000/all-followed-users",
          {
            token,
          }
        );
        setFollowing(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  async function follow(reviewedBy) {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const response = await axios.post("http://localhost:4000/follow-user", {
        token,
        userFollowed: reviewedBy,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function isFollowed(reviewedBy) {
    const newArr = following.map((el) => el.userFollowed);
    console.log(following);
    console.log(newArr);
    return newArr.includes(reviewedBy);
  }

  return (
    <div>
      {showReviews.map(({ review, reviewedBy, rating }) => (
        <>
          <div>{review}</div>
          <div>{reviewedBy}</div>
          <div>{rating}</div>
          <Button
            onClick={() => follow(reviewedBy)}
            color={isFollowed(reviewedBy) ? "secondary" : "primary"}
          >
            Follow
          </Button>
        </>
      ))}
    </div>
  );
}
