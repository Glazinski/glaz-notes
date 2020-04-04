import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditLabels from '../components/notes/labels/EditLabels';

// React router
import {
  Link, useLocation,
} from 'react-router-dom';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

// MUI icons
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const useStyles = makeStyles((theme) => ({
  item: {
    borderRadius: '0 50px 50px 0',
  },
  divider: {
    margin: '10px 0',
  },
  subtitle: {
    margin: '15px 0 15px 15px',
  },
  selected: {
    backgroundColor: 'red',
  },
}));

const DrawerList = (props) => {
  const classes = useStyles();
  const { selectedIndex, handleListItemClick, handleMobileDrawerToggle } = props;
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const handleItemClick = (index) => {
    if (handleMobileDrawerToggle) handleMobileDrawerToggle();
    handleListItemClick(index);
  };

  useEffect(() => {
    if (pathname === '/') {
      handleListItemClick(0);
    } else if (pathname === '/bin') {
      handleListItemClick(2);
    }
  }, []);

  const handleOpenClick = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <List>
      {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem className={classes.item} button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
      <ListItem
        className={`${classes.item}`}
        // classes={{ selected: classes.active }}
        component={Link}
        to="/"
        button
        selected={selectedIndex === 0}
        // onClick={() => handleListItemClick(0)}
        onClick={() => handleItemClick(0)}
      >
        <ListItemIcon><EmojiObjectsOutlinedIcon /></ListItemIcon>
        <ListItemText primary="Notes" />
      </ListItem>

      <Divider className={classes.divider} />

      <Typography className={classes.subtitle} variant="overline">LABELS</Typography>
      <ListItem
        className={classes.item}
        button
        onClick={handleOpenClick}
      >
        <ListItemIcon><EditOutlinedIcon /></ListItemIcon>
        <ListItemText primary="Edit label" />
      </ListItem>
      <EditLabels open={open} handleClose={handleClose} />

      <Divider className={classes.divider} />
      <ListItem
        className={classes.item}
        button
        component={Link}
        to="/bin"
        selected={selectedIndex === 2}
        onClick={() => handleItemClick(2)}
      >
        <ListItemIcon><DeleteOutlinedIcon /></ListItemIcon>
        <ListItemText primary="Bin" />
      </ListItem>
    </List>
  );
};

DrawerList.defaultProps = {
  handleMobileDrawerToggle: null,
};

DrawerList.propTypes = {
  selectedIndex: PropTypes.number.isRequired,
  handleListItemClick: PropTypes.func.isRequired,
  handleMobileDrawerToggle: PropTypes.func,
};

export default DrawerList;
