import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';

import DrawerList from '../Layout/DrawerList';
import Settings from './nav/Menu';
import Search from './nav/Search';
import EditLabels from './notes/labels/EditLabels';
import UndoNoteOperation from './notes/UndoNoteOperation';

import { useStyles } from './Home.styles';

const Home = ({ children }) => {
  const [navTitle, setNavtitle] = useState('Notes');
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState('/');
  const { uid } = useSelector((state) => state.firebase.auth);
  const labelsList = useSelector((state) => state.labels.labels);
  const classes = useStyles();
  const { labelId } = useParams();
  const { pathname } = useLocation();

  const handleNavTitle = React.useCallback(() => {
    if (_.values(labelsList).length > 0) {
      if (labelId) {
        setNavtitle(labelsList[labelId].labelName);
        return;
      }

      if (pathname.length > 1) {
        const string = pathname.substr(1);
        setNavtitle(string.charAt(0).toUpperCase() + string.slice(1));
        return;
      }

      setNavtitle('Notes');
    }
  }, [labelsList, labelId, pathname]);

  useEffect(() => {
    handleNavTitle();
  }, [handleNavTitle]);

  const toggleDrawer = () => setOpen(!open);

  const toggleMobileDrawer = (newOpen) => {
    setMobileOpen(newOpen);
  };

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  if (!uid) return <Redirect to="/login" />;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color="inherit"
        variant="outlined"
        position="fixed"
        className={classes.appBar}
      >
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
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6">{navTitle}</Typography>
          <Search />
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
          <DrawerList
            selectedIndex={selectedIndex}
            handleListItemClick={handleListItemClick}
          />
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

Home.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Home;
