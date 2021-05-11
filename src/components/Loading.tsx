import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

export const Loading: React.FC = () => {
  return (
    <>
      <Box display="flex" justifyContent="center" mb={2}>
        <CircularProgress />
      </Box>
      <Box display="flex" justifyContent="center">
        Please wait...
      </Box>
    </>
  );
};
