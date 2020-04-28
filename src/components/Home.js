import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import clsx from 'clsx';
import DrawerList from '../Layout/DrawerList';
import Settings from './settings/Menu';
import EditLabels from './notes/labels/EditLabels';
import UndoNoteOperation from './notes/UndoNoteOperation';

// Redux
import { connect } from 'react-redux';

// React router
import {
  Redirect,
  useParams,
  useLocation,
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
  // pageTitle: {
  //   textTransform: 'capitalize',
  // },
}));


const Home = (props) => {
  const classes = useStyles();
  const { auth: { uid }, children, labelsList } = props;

  const [navTitle, setNavtitle] = useState('Notes');
  const { labelId } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    if (_.values(labelsList).length > 0) {
      if (labelId) {
        setNavtitle(labelsList[labelId].labelName);
      } else if (pathname.length > 1) {
        const string = pathname.substr(1);
        setNavtitle(string.charAt(0).toUpperCase() + string.slice(1));
      } else {
        setNavtitle('Notes');
      }
    }
  }, [labelsList, labelId, pathname]);

  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);

  const toggleMobileDrawer = (newOpen) => {
    setMobileOpen(newOpen);
  };

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
              onClick={toggleDrawer}
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
              onClick={() => toggleMobileDrawer(true)}
              // onClick={() => console.log('cojest')}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6">{navTitle}</Typography>
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
          onClose={() => toggleMobileDrawer(false)}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <DrawerList
            selectedIndex={selectedIndex}
            handleListItemClick={handleListItemClick}
            toggleMobileDrawer={toggleMobileDrawer}
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
          <EditLabels />
          <UndoNoteOperation />
        </main>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  labelsList: state.labels.labels,
});

Home.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.object]).isRequired,
  labelsList: PropTypes.oneOfType([PropTypes.object]).isRequired,
  children: PropTypes.node.isRequired,
};

export default connect(mapStateToProps)(Home);
