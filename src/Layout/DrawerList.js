import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditLabels from '../components/notes/labels/EditLabels';

// REDUX
import { connect } from 'react-redux';
import { moveNoteClear } from '../store/actions/notesActions';

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
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';

const useStyles = makeStyles((theme) => ({
  item: {
    margin: '10px 0',
    borderRadius: '0 50px 50px 0',
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
  const {
    selectedIndex, handleListItemClick, handleMobileDrawerToggle, moveNoteClear,
  } = props;
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const handleItemClick = (index) => {
    moveNoteClear();
    if (handleMobileDrawerToggle) handleMobileDrawerToggle();
    handleListItemClick(index);
  };

  useEffect(() => {
    if (pathname === '/') {
      handleListItemClick(0);
    } else if (pathname === '/bin') {
      handleListItemClick(2);
    } else if (pathname === '/archive') {
      handleListItemClick(3);
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

      <Divider />

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

      <Divider />
      <ListItem
        className={classes.item}
        button
        component={Link}
        to="/archive"
        selected={selectedIndex === 3}
        onClick={() => handleItemClick(3)}
      >
        <ListItemIcon><ArchiveOutlinedIcon /></ListItemIcon>
        <ListItemText primary="Archive" />
      </ListItem>

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
  moveNoteClear: PropTypes.func.isRequired,
};

export default connect(null, { moveNoteClear })(DrawerList);
