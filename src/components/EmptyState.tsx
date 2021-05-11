import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as EmptyCat } from "../assets/catBack.svg";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  svg: {
    width: 500,
    maxWidth: "100%",
  },
}));

export const EmptyState: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Box display="flex" justifyContent="center" p={3}>
        <EmptyCat className={classes.svg} />
      </Box>
      <Box display="flex" justifyContent="center" p={3}>
        <Typography align="center">
          There are no cats here. Try the 'UPLOAD' button above.
        </Typography>
      </Box>
    </>
  );
};
