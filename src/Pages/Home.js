import React from 'react';
import axios from 'axios';
import Show from '../components/Show';

export default function Home({ setSignedIn, signedIn, setShowReviews }) {
  // const [reviews, setReviews] = React.useState([]);
  const [shows, setShows] = React.useState([]);

  React.useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          'https://7v0n195sii.execute-api.us-east-1.amazonaws.com/dev/get-shows',
        );
        setShows(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div style={styles.card}>
      {shows.map((show) => (
        <Show show={show} signedIn={signedIn} setShowReviews={setShowReviews} />
      ))}
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '10px',
  },
};
