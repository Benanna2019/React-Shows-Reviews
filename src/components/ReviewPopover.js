import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const style = {
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

export default function ReviewPopover({ show, signedIn }) {
  const [rating, setRating] = React.useState(undefined);
  const [review, setReview] = React.useState(undefined);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  async function createPost() {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const showId = show.imdbId;
      const userReview = review;
      const userRating = rating;

      const response = await axios.post("http://localhost:4000/create-review", {
        token,
        showId,
        review: userReview,
        rating: userRating,
      });
      setAnchorEl(null);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Leave A Review
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div style={style.content}>
          <Typography className={classes.typography}>
            Title: {show.title}
          </Typography>
          <label>Rating: </label>
          <input type="text" onChange={(e) => setRating(e.target.value)} />
          <label>Review: </label>
          <textarea
            rows="4"
            cols="50"
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          <button onClick={createPost}>Create Review</button>
        </div>
      </Popover>
    </div>
  );
}
