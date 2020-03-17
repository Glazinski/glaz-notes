import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import NotesList from './notes/NotesList';
import CreateNote from './notes/CreateNote';

// Redux
import { connect } from 'react-redux';
import { signOut } from '../store/actions/authActions';

// React router

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
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';

// MUI icons
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

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
    height: '100vh',
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
  item: {
    borderRadius: '0 50px 50px 0',
  },
}));


const Home = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setOpen(!open);
  const handleMobileDrawerToggle = () => setMobileOpen(!mobileOpen);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSignOut = () => {
    props.signOut();
    handleClose();
  };

  const DrawerList = () => (
    <List>
      {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem className={classes.item} button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
      <ListItem className={classes.item} button>
        <ListItemIcon><EmojiObjectsOutlinedIcon /></ListItemIcon>
        <ListItemText primary="Notes" />
      </ListItem>
      <Divider />
      <ListItem className={classes.item} button>
        <ListItemIcon><EditOutlinedIcon /></ListItemIcon>
        <ListItemText primary="Edit label" />
      </ListItem>
    </List>
  );

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
          <DrawerList />
        </Drawer>
      </Hidden>
      {/* Mobile */}
      <Hidden only={['md', 'lg', 'xl']} implementation="css">
        <Drawer
          className={classes.drawer}
          variant="temporary"
          // anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          anchor="left"
          open={mobileOpen}
          onClose={handleMobileDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <DrawerList />
        </Drawer>
      </Hidden>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <CreateNote />
        <NotesList />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
          facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
          consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
          vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
          hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
          tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
          nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </main>
    </div>
  );
};

Home.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default connect(null, { signOut })(Home);
