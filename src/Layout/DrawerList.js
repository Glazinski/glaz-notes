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

      <Divider className={classes.divider} />

      <Typography className={classes.subtitle} variant="overline">LABELS</Typography>
      <ListItem
        className={classes.item}
        button
        component={Link}
        to="/test"
        selected={selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1)}
        style={selectedIndex === 1 ? { backgroundColor: '#feefc3' } : null}
      >
        <ListItemIcon><EditOutlinedIcon /></ListItemIcon>
        <ListItemText primary="Edit label" />
      </ListItem>
      <Divider className={classes.divider} />
      <ListItem
        className={classes.item}
        button
        component={Link}
        to="/bin"
        selected={selectedIndex === 2}
        onClick={(event) => handleListItemClick(event, 2)}
        style={selectedIndex === 2 ? { backgroundColor: '#feefc3' } : null}
      >
        <ListItemIcon><DeleteOutlinedIcon /></ListItemIcon>
        <ListItemText primary="Bin" />
      </ListItem>
    </List>
  );
};

export default DrawerList;
