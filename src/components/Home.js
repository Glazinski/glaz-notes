import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import DrawerList from '../Layout/DrawerList';
import Bin from '../pages/Bin';
import Notes from '../pages/Notes';

// Redux
import { connect } from 'react-redux';
import { signOut } from '../store/actions/authActions';

// React router
import {
  Switch, Route, Redirect,
} from 'react-router-dom';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';

// MUI icons
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

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
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: 'none',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: theme.palette.background.paper,
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


const Home = ({ signOut, auth: { uid } }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setOpen(!open);
  const handleMobileDrawerToggle = () => setMobileOpen(!mobileOpen);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSignOut = () => {
    signOut();
    handleClose();
  };

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setMobileOpen(false);
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
            <Tooltip title="settings" aria-label="settings" placement="bottom">
              <IconButton edge="end" color="inherit" onClick={handleClick}>
                <SettingsOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleSignOut}>Logout</MenuItem>
            </Menu>
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
          <DrawerList selectedIndex={selectedIndex} handleListItemClick={handleListItemClick} />
        </Drawer>
      </Hidden>
      <div style={{ width: '100%', margin: '0 auto' }}>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Switch>
            {/* <Route exact path="/" component={NotesList} /> */}
            <Route exact path="/" component={Notes} />
            {/* <Route path="/bin" component={NotesList} /> */}
            <Route path="/bin" component={Bin} />
            <Route path="/test" render={() => <h1>Elo</h1>} />
          </Switch>
        </main>
      </div>
    </div>
  );
};

Home.propTypes = {
  signOut: PropTypes.func.isRequired,
  auth: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

export default connect(mapStateToProps, { signOut })(Home);
