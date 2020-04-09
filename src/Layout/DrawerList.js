import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditLabels from '../components/notes/labels/EditLabels';
import DrawerLabelList from '../components/notes/labels/DrawerLabelList';

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
    selectedIndex, handleListItemClick, moveNoteClear,
  } = props;
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const handleItemClick = (index) => {
    moveNoteClear();
    // if (handleMobileDrawerToggle) handleMobileDrawerToggle();
    // handleMobileDrawerToggle();
    handleListItemClick(index);
  };

  useEffect(() => {
    handleItemClick(pathname);
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
        selected={selectedIndex === '/'}
        // onClick={() => handleListItemClick(0)}
        onClick={() => handleItemClick('/')}
      >
        <ListItemIcon><EmojiObjectsOutlinedIcon /></ListItemIcon>
        <ListItemText primary="Notes" />
      </ListItem>

      <Divider />

      <Typography className={classes.subtitle} variant="overline">LABELS</Typography>
      <DrawerLabelList
        itemClassName={classes.item}
        handleItemClick={handleItemClick}
        selectedIndex={selectedIndex}
      />
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
        selected={selectedIndex === '/archive'}
        onClick={() => handleItemClick('/archive')}
      >
        <ListItemIcon><ArchiveOutlinedIcon /></ListItemIcon>
        <ListItemText primary="Archive" />
      </ListItem>

      <ListItem
        className={classes.item}
        button
        component={Link}
        to="/bin"
        selected={selectedIndex === '/bin'}
        onClick={() => handleItemClick('/bin')}
      >
        <ListItemIcon><DeleteOutlinedIcon /></ListItemIcon>
        <ListItemText primary="Bin" />
      </ListItem>
    </List>
  );
};

DrawerList.propTypes = {
  selectedIndex: PropTypes.string.isRequired,
  handleListItemClick: PropTypes.func.isRequired,
  moveNoteClear: PropTypes.func.isRequired,
};

export default connect(null, { moveNoteClear })(DrawerList);
