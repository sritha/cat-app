import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { ReactComponent as CatLogo } from '../assets/catLogo.svg';

const useStyles = makeStyles((theme) => ({
  logo: {
    width: 60,
    height: 60
  },
  root: {
    padding: 0
  },
  menuButton: {
    marginRight: theme.spacing(2),
    alignSelf: 'flex-start'
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
    fontWeight: 200
  },
  appBar: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: 'none',
    borderBottom: '2px solid #000'
  },
  toolbarTop: {
    paddingTop: theme.spacing(2)
  },
  toolbarBottom: {
    paddingBottom: theme.spacing(2)
  },
  content: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6)
  }
}));

export const PageLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position='static' className={classes.appBar}>
        <Container>
          <Toolbar className={classes.toolbarTop}>
            <Box flexGrow={10}>
              <a href='/'>
                <CatLogo className={classes.logo} />
              </a>
            </Box>
            <Button href='/' color='inherit' className={classes.menuButton}>
              Home
            </Button>
            <Button
              href='/upload'
              color='inherit'
              className={classes.menuButton}
            >
              Upload
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Container className={classes.content}>
        <div>{children}</div>
      </Container>
    </>
  );
};
