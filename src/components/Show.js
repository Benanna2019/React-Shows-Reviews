import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ShowPopover from "./ShowPopover";
import ReviewPopover from "./ReviewPopover";
import axios from "axios";
import { navigate } from "@reach/router";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "10px",
  },
});

export default function Show({ show, signedIn, setShowReviews }) {
  const classes = useStyles();

  async function getShowReviews() {
    // console.log("get show reviews hit");
    try {
      const response = await axios.get(
        `http://localhost:4000/review-by-showid?showId=${show.imdbId}`
      );
      setShowReviews(response.data);
      navigate("/showreviews");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="400"
          image={show.poster}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {show.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {show.plot}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ReviewPopover show={show} signedIn={signedIn} />
        <ShowPopover show={show} />
        <Button onClick={() => getShowReviews()}>Get Show Reviews</Button>
      </CardActions>
    </Card>
  );
}
