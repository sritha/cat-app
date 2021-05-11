import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ThumbUpOutlined from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownOutlined from "@material-ui/icons/ThumbDownOutlined";
import DeleteForeverOutlined from "@material-ui/icons/DeleteForeverOutlined";
import React, { useContext, useState } from "react";
import { CatInfo } from "../models/Cat";
import { CatsContext } from "./CatsContext";

const useStyles = makeStyles((theme) => ({
  boxTR: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  boxBL: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  boxBR: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  icon: {
    color: theme.palette.secondary.contrastText,
  },
  votes: {
    fontWeight: "bold",
    fontSize: 14,
    color: theme.palette.secondary.contrastText,
  },
  button: {
    minWidth: 36,
  },
}));

export interface ICatControlsProps {
  id: string;
  catInfo: CatInfo;
}

export const CatControls: React.FC<ICatControlsProps> = ({ id, catInfo }) => {
  const classes = useStyles();
  const [removeOpen, setRemoveOpen] = useState(false);

  const {
    addFavourite,
    removeFavourite,
    voteDown,
    voteUp,
    removeCat,
  } = useContext(CatsContext);

  const handleRemove = () => {
    removeCat(id);
    setRemoveOpen(false);
  };

  return (
    <>
      <Box className={classes.boxBL}>
        {catInfo.favorite ? (
          <Button
            aria-label="Remove favourite"
            className={classes.button}
            onClick={() => removeFavourite(catInfo.favorite!)}
          >
            <Favorite className={classes.icon} />
          </Button>
        ) : (
          <Button
            aria-label="Add favourite"
            className={classes.button}
            onClick={() => addFavourite(id)}
          >
            <FavoriteBorder className={classes.icon} />
          </Button>
        )}
      </Box>
      <Box display="flex" alignItems="center" className={classes.boxBR}>
        <Button
          aria-label="Upvote"
          className={classes.button}
          onClick={() => voteUp(id)}
        >
          <ThumbUpOutlined className={classes.icon} />
        </Button>
        <Box className={classes.votes}>{catInfo.votes || "0"}</Box>
        <Button
          aria-label="Downvote"
          className={classes.button}
          onClick={() => voteDown(id)}
        >
          <ThumbDownOutlined className={classes.icon} />
        </Button>
      </Box>
      <Box display="flex" alignItems="center" className={classes.boxTR}>
        <Button
          aria-label="Upvote"
          className={classes.button}
          onClick={() => setRemoveOpen(true)}
        >
          <DeleteForeverOutlined className={classes.icon} />
        </Button>
      </Box>

      <Dialog
        open={removeOpen}
        onClose={() => setRemoveOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete cat image"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to remove this image?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRemoveOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={handleRemove} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
