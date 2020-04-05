import React from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// MUI icons
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    width: 150,
    height: 60,
    position: 'absolute',
    top: '-60px',
    left: 0,
    zIndex: 1400,
    padding: '5px',
  },
  item: {
    padding: 3,
    margin: 1,
    // borderRadius: 100,
  },
}));

const ColorList = () => {
  const classes = useStyles();

  const colors = [
    {
      name: 'red',
      color: 'red',
    },
    {
      name: 'orange',
      color: 'orange',
    },
    {
      name: 'yellow',
      color: 'yellow',
    },
  ];

  const items = colors.map((item) => (
    <Tooltip key={item.color} title={item.name}>
      <IconButton size="small" className={classes.item} style={{ backgroundColor: item.color }}>
        <CheckIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  ));

  return (
    <Paper className={classes.root}>
      {/* {items} */}
    </Paper>
  );
};

export default ColorList;
