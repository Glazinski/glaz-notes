import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import DrawerList from '../Layout/DrawerList';
import Settings from './settings/Menu';
import UndoNoteOperation from './notes/UndoNoteOperation';

// Redux
import { connect } from 'react-redux';

// React router
import {
  Redirect,
} from 'react-router-dom';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.default,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: 'none',
    backgroundColor: theme.palette.background.default,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: -drawerWidth,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  toolbar: theme.mixins.toolbar,
}));


const Home = ({ auth: { uid }, children }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setOpen(!open);
  const handleMobileDrawerToggle = () => setMobileOpen(!mobileOpen);

  const [selectedIndex, setSelectedIndex] = useState('/');

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  if (!uid) return <Redirect to="/login" />;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar color="inherit" variant="outlined" position="fixed" className={classes.appBar}>
        <Toolbar>
          {/* Desktop */}
          <Hidden only={['xs', 'sm']}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          {/* /Mobile */}
          <Hidden only={['md', 'lg', 'xl']} implementation="css">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleMobileDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6">
            Notes
          </Typography>
          <div className={classes.grow} />
          <div>
            <Settings />
          </div>
        </Toolbar>
      </AppBar>
      {/* Desktop */}
      <Hidden only={['xs', 'sm']}>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <DrawerList selectedIndex={selectedIndex} handleListItemClick={handleListItemClick} />
        </Drawer>
      </Hidden>
      {/* Mobile */}
      <Hidden only={['md', 'lg', 'xl']} implementation="css">
        <Drawer
          className={classes.drawer}
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleMobileDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <DrawerList
            handleMobileDrawerToggle={handleMobileDrawerToggle}
            selectedIndex={selectedIndex}
            handleListItemClick={handleListItemClick}
          />
        </Drawer>
      </Hidden>
      <div style={{ width: '100%', margin: '0 auto' }}>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {children}
          <UndoNoteOperation />
        </main>
      </div>
    </div>
  );
};

Home.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

export default connect(mapStateToProps)(Home);
