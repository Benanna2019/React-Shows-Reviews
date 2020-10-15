import React from 'react';
import axios from 'axios';
import Review from '../components/Review';

export default function MyReviews({ signedIn }) {
  const [myReviews, setMyReviews] = React.useState([]);
  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        axios
          .post(
            'https://7v0n195sii.execute-api.us-east-1.amazonaws.com/dev/reviews-by-user',
            {
              token,
            },
          )
          .then((resp) => {
            setMyReviews(resp.data[0]);
            console.log(myReviews);
          });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      {myReviews.map((review) => (
        <Review review={review} signedIn={signedIn} />
      ))}
    </div>
  );
}
