import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const rowHeight = 350;

const useStyles = makeStyles((theme) => ({
  item: {
    margin: theme.spacing(1),
    padding: 0,
    listStyle: 'none',
    display: 'block',
    position: 'relative',
    height: rowHeight
  },
  image: {
    top: 0,
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    position: 'absolute',
    objectPosition: '50% 50%',
    verticalAlign: 'bottom',
    backgroundColor: theme.palette.divider,
    borderRadius: 4
  },
  filler: {
    display: 'block'
  }
}));

export interface ImageListItemProps {
  width: number;
  height: number;
  url: string;
  alt: string;
}

export const ImageListItem: React.FC<ImageListItemProps> = ({
  width,
  height,
  url,
  alt,
  children
}) => {
  const classes = useStyles();
  return (
    <li
      className={classes.item}
      style={{
        width: '250px',
        flexGrow: (width / height) * rowHeight
      }}
    >
      <i
        className={classes.filler}
        style={{ paddingBottom: `${(height / width) * 100}%` }}
      ></i>
      <img src={url} alt={alt} className={classes.image} />
      {children}
    </li>
  );
};
