import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function ShowPopover({ show }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        Learn More
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
        <Typography className={classes.typography}>
          Actors: {show.actors}
        </Typography>
        <Typography className={classes.typography}>
          Released Date: {show.released}
        </Typography>
        <Typography className={classes.typography}>
          Rating: {show.rated}
        </Typography>
        <Typography className={classes.typography}>
          Total Seasons: {show.totalSeasons}
        </Typography>
        <Typography className={classes.typography}>
          Imdb Rating: {show.imdbRating}
        </Typography>
        <Typography className={classes.typography}>
          Runtime: {show.runtime}
        </Typography>
      </Popover>
    </div>
  );
}
