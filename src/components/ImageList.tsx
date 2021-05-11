import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  list: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "stretch",
    overflow: "hidden",
    margin: "0 auto",
    padding: theme.spacing(0),
    width: "100%",

    "&::after": {
      flexGrow: 9999,
      content: '""',
      display: '"block"',
    },
  },
}));

export const ImageList: React.FC = ({ children }) => {
  const classes = useStyles();
  return <ul className={classes.list}>{children}</ul>;
};
