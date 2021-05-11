import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { uploadImage } from "../api/thaCatApi";
import Button from "@material-ui/core/Button";
import useLocation from "wouter/use-location";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import { Loading } from "./Loading";
import { ReactComponent as UploadCat } from "../assets/catSide.svg";
import { CatsContext } from "./CatsContext";

const useStyles = makeStyles(() => ({
  input: {
    display: "none",
  },
  svg: {
    width: 500,
    maxWidth: "100%",
  },
}));

export const Upload: React.FC = () => {
  const classes = useStyles();
  const [, setLocation] = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { refreshCats } = useContext(CatsContext);

  // Upload image
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    setError(null);
    if (event.target.files) {
      const files = Array.from(event.target.files);
      uploadImage(files[0])
        .then(() => {
          setLocation("/");
          refreshCats();
        })
        .catch((error) => {
          if (error.message) {
            setError(
              `Ups... something wrong happened. Cat image could not be uploaded. ${error.message}`
            );
          } else {
            setError(
              "Ups... something wrong happened. Cat image could not be uploaded."
            );
          }
        })
        .finally(() => {
          setUploading(false);
        });
    } else {
      setUploading(false);
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="center" p={3}>
        <UploadCat className={classes.svg} />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={3}
      >
        {uploading ? (
          <Loading />
        ) : (
          <>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="upload-file"
              type="file"
              className={classes.input}
              onChange={onChange}
            />
            <label htmlFor="upload-file">
              <Button
                size="large"
                variant="contained"
                color="primary"
                component="span"
              >
                Upload
              </Button>
            </label>
          </>
        )}
      </Box>
      <Box display="flex" justifyContent="center" p={3}>
        <Typography align="center">Please upload cat images only.</Typography>
      </Box>
      {error ? (
        <Box display="flex" justifyContent="center" p={3}>
          <Typography>{error}</Typography>
        </Box>
      ) : null}
    </>
  );
};
