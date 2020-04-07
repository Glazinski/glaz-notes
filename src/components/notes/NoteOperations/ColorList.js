import React from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

// MUI icons
import CheckIcon from '@material-ui/icons/Check';

const listWidth = 80;

const useStyles = makeStyles((theme) => ({
  root: {
    width: 150,
    height: listWidth,
    position: 'absolute',
    top: -listWidth,
    left: 0,
    zIndex: 1400,
    padding: '5px',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridRowGap: '5px',
  },
  item: {
    width: '25px',
    height: '25px',
    borderRadius: '100px',
    border: 'none',
    margin: 'auto',
    '&:hover': {
      border: `2px solid ${theme.palette.text.primary}`,
      cursor: 'pointer',
    },
    outline: 'none',
    // backgroundColor: theme.palette.background.default,
    // padding: 3,
    // margin: 1,
    // borderRadius: 100,
  },
}));

const ColorList = () => {
  const classes = useStyles();

  const colors = [
    {
      name: 'default',
      color: '#303030',
      // color: 'inherit',
    },
    {
      name: 'red',
      color: '#f28b82',
    },
    {
      name: 'orange',
      color: '#fbbc04',
    },
    {
      name: 'yellow',
      color: '#fff475',
    },
    {
      name: 'green',
      color: '#345920',
    },
    {
      name: 'teal',
      color: '#16504b',
    },
  ];

  const items = colors.map((item, index) => (
    <Tooltip key={item.color} title={item.name}>
      <button type="button" className={classes.item} style={{ backgroundColor: item.color }}>
        {/* <CheckIcon fontSize="small" /> */}
      </button>
    </Tooltip>
  ));

  return (
    <Paper className={classes.root}>
      <div className={classes.content}>
        {items}
      </div>
    </Paper>
  );
};

export default ColorList;
