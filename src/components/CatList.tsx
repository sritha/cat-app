import React, { useContext } from "react";
import { CatsContext } from "./CatsContext";
import { CatListItem } from "./CatListItem";
import { ImageList } from "./ImageList";
import { EmptyState } from "./EmptyState";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Loading } from "./Loading";

export const CatList: React.FC = () => {
  const { cats } = useContext(CatsContext);
  const { isLoading, isError } = useContext(CatsContext);

  return isError ? (
    <Box display="flex" justifyContent="center" p={3}>
      <Typography>
        Ups... cannot load cats. Please try to refresh the page.
      </Typography>
    </Box>
  ) : isLoading ? (
    <Loading />
  ) : cats?.length ? (
    <ImageList>
      {cats ? cats.map((cat) => <CatListItem cat={cat} key={cat.id} />) : null}
    </ImageList>
  ) : (
    <EmptyState></EmptyState>
  );
};
