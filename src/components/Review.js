import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

export default function Review({ review, signedIn }) {
  const [following, setFollowing] = React.useState([]);
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [fetchToggle, setFetchToggle] = React.useState(false);

  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const response = await axios.post(
          'https://7v0n195sii.execute-api.us-east-1.amazonaws.com/dev/all-followed-users',
          {
            token,
          },
        );
        setFollowing(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [fetchToggle]);

  async function follow(reviewedBy) {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const response = await axios.post(
        'https://7v0n195sii.execute-api.us-east-1.amazonaws.com/dev/follow-user',
        {
          token,
          userFollowed: reviewedBy,
        },
      );
      setIsFollowed(true);
      setFetchToggle(!fetchToggle);
    } catch (error) {
      console.log(error);
    }
  }

  function checkIsFollowed(reviewedBy) {
    const newArr = following.map((el) => el.userFollowed);
    return newArr.includes(reviewedBy);
  }

  async function unfollow(reviewedBy) {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const response = await axios.post(
        'https://7v0n195sii.execute-api.us-east-1.amazonaws.com/dev/unfollow-user',
        {
          token,
          userFollowed: reviewedBy,
        },
      );
      setIsFollowed(false);
      setFetchToggle(!fetchToggle);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Paper elevation={3} variant="outlined" style={style.reviewCont}>
      <h2>{review.title}</h2>
      <div>
        <img src={review.poster} height="250px" />
      </div>
      <div>{review.review}</div>
      <div>{review.reviewedBy}</div>
      <div>{review.isFollowedrating}</div>

      <div>{review.isFollowedrating}</div>
      <div>{review.isFollowedrating}</div>
      <Button
        onClick={
          isFollowed || checkIsFollowed(review.reviewedBy)
            ? () => unfollow(review.reviewedBy)
            : () => follow(review.reviewedBy)
        }
        color={
          isFollowed || checkIsFollowed(review.reviewedBy)
            ? 'secondary'
            : 'primary'
        }
      >
        {isFollowed || checkIsFollowed(review.reviewedBy)
          ? 'Unfollow'
          : 'Follow'}
      </Button>
    </Paper>
  );
}

const style = {
  reviewCont: {
    textAlign: 'center',
    width: '35vw',
    margin: '20px',
  },
};
