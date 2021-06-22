import React, { useState } from "react";
import clsx from "clsx";
import { Redirect, useLocation } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import { Box, Avatar, ListItemAvatar, ListItem, ListItemIcon, ListItemText, Drawer, AppBar, Toolbar, List, CssBaseline, Typography, Divider, IconButton } from "@material-ui/core";
import Logo from '../../assets/log.png'
import {Movies, Account} from '../main-components'

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),

  },
  primaryColor: {
    backgroundColor: theme.palette.primary.main
  },
  nested: {
    paddingLeft: theme.spacing(9),
  }
}));

const Login = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [stateComp, setStateComp] = useState({
    movies: true,
    account: false
  })

  if (!localStorage.getItem("accessToken") && !location.state) {
    return (
      <Redirect to="/" />
    )
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderFavs = () => {
    setStateComp({movies: false, account: false});
  }

  const renderAccount = () => {
    setStateComp({movies: false, account: true});
  }

  const renderMovies = () => {
    setStateComp({movies: true, account: false});
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Box  paddingRight={1} bgcolor="#2d2e4d">
            <img src={Logo} width={50} />
          </Box>
          <Typography variant="h6" noWrap>
            Movies
          </Typography>

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>

          <ListItem button onClick={renderMovies}>
            <ListItemIcon >
              <LocalMoviesIcon color="primary" />
            </ListItemIcon >
            <ListItemText primary="Movies" secondary="See more categorys" />        
          </ListItem>
          <ListItem button onClick={renderAccount}>
            <ListItemAvatar ><Avatar className={[classes.small, classes.primaryColor]}></Avatar></ListItemAvatar>
            <ListItemText primary="My Account" secondary="DanyHerz42" />
          </ListItem>

        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {stateComp.account ? <Account token={ localStorage.getItem("accessToken") ||location.state.token } />: null}
        {stateComp.movies ? <Movies token={ localStorage.getItem("accessToken") ||location.state.token } />: null}
      </main>
    </div>
  );
}

export default Login;