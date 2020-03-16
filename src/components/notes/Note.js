import React from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 238,
    height: 56,
    border: '1px solid black',
  },
}));

const Note = () => {
  const classes = useStyles();

  return (
    // <Paper className={classes.paper} variant="outlined" style={{ height: props.height }}>
    //   <h4>Notka</h4>
    // </Paper>
    <div className={classes.paper}>
      <h4>notka</h4>
    </div>
  );
};

export default Note;
