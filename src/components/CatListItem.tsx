import React from "react";
import { Cat } from "../models/Cat";
import { CatControls } from "./CatControls";
import { ImageListItem } from "./ImageListItem";

export interface CatListItemProps {
  cat: Cat;
}

export const CatListItem: React.FC<CatListItemProps> = ({ cat }) => {
  return (
    <ImageListItem alt={cat.original_filename} {...cat}>
      <CatControls id={cat.id} catInfo={cat.catInfo} />
    </ImageListItem>
  );
};
