import React from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
}));

const ChangeColor = (props) => {
  const classes = useStyles();

  return (
    <Popover
      className={classes.popover}
      id="mouse-over-popover"
      open={props.open}
      anchorEl={props.anchorEl}
      onClose={props.onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Paper style={{ width: '100px', height: '50px' }}>
        <h4>elo</h4>
      </Paper>
    </Popover>
  );
};

export default ChangeColor;
