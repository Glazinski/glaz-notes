import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DrawerLabelList from '../components/notes/labels/DrawerLabelList';

// REDUX
import { connect } from 'react-redux';
import { moveNoteClear } from '../store/actions/notesActions';
import { openEditLabels } from '../store/actions/labelsActions';

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
    selectedIndex,
    handleListItemClick,
    moveNoteClear,
    toggleMobileDrawer,
    openEditLabels,
  } = props;
  const { pathname } = useLocation();

  const handleItemClick = (index) => {
    moveNoteClear();
    handleListItemClick(index);
  };

  useEffect(() => {
    handleItemClick(pathname);
  }, []);

  return (
    <div
      role="presentation"
      onClick={toggleMobileDrawer ? () => toggleMobileDrawer(false) : null}
    >
      <List>
        <ListItem
          className={`${classes.item}`}
          component={Link}
          to="/"
          button
          selected={selectedIndex === '/'}
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
          // onClick={handleOpenClick}
          onClick={openEditLabels}
        >
          <ListItemIcon><EditOutlinedIcon /></ListItemIcon>
          <ListItemText primary="Edit label" />
        </ListItem>

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
    </div>
  );
};

DrawerList.defaultProps = {
  toggleMobileDrawer: null,
};

DrawerList.propTypes = {
  selectedIndex: PropTypes.string.isRequired,
  handleListItemClick: PropTypes.func.isRequired,
  moveNoteClear: PropTypes.func.isRequired,
  toggleMobileDrawer: PropTypes.func,
};

export default connect(null, { moveNoteClear, openEditLabels })(DrawerList);
