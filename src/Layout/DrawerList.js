import React, { useState } from 'react';

// React router
import {
  Link,
} from 'react-router-dom';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// MUI icons
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const useStyles = makeStyles((theme) => ({
  item: {
    borderRadius: '0 50px 50px 0',
  },
}));

const DrawerList = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const classes = useStyles();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

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
        onClick={(event) => handleListItemClick(event, 0)}
        style={selectedIndex === 0 ? { backgroundColor: '#feefc3' } : null}
      >
        <ListItemIcon><EmojiObjectsOutlinedIcon /></ListItemIcon>
        <ListItemText primary="Notes" />
      </ListItem>
      <Divider />
      <ListItem
        className={classes.item}
        button
        component={Link}
        to="/test"
        selected={selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1)}
      >
        <ListItemIcon><EditOutlinedIcon /></ListItemIcon>
        <ListItemText primary="Edit label" />
      </ListItem>
    </List>
  );
};

export default DrawerList;
