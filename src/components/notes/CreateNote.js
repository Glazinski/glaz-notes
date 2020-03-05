import React, { useState, useRef } from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    maxWidth: 520,
    padding: theme.spacing(1),
    margin: '0 auto 80px auto',
  },
  textField: {
    borderBottom: 'none',
    marginLeft: 10,
  },
  button: {
    color: theme.palette.text.primary,
  },
  textFieldLabel: {
    '&::placeholder': {
      color: theme.palette.text.primary,
      fontWeight: 'bold',
    },
    resize: {
      fontSize: 5,
    },
  },
}));

const CreateNote = () => {
  const classes = useStyles();
  const [isFocused, setIsFocused] = useState(false);
  const textFieldEl = useRef(null);

  const handleFocus = () => {
    textFieldEl.current.focus();
    setIsFocused(true);
  };

  return (
    <ClickAwayListener onClickAway={() => setIsFocused(false)}>
      <Paper
        onClick={!isFocused ? handleFocus : null}
        className={classes.paper}
        elevation={5}
      >
        <Grid container justif="center" direction="column">
          {isFocused ? (
            <Grid item>
              <TextField
                className={classes.textField}
                InputProps={{ disableUnderline: true, classes: { input: classes.textFieldLabel } }}
                placeholder="Title"
                style={{ marginBottom: '20px' }}
              />
            </Grid>
          ) : null}
          <Grid item>
            <TextField
              id={`${isFocused ? 'resized-label' : null}`}
              className={classes.textField}
              InputProps={{
                disableUnderline: true,
                classes: { input: classes.textFieldLabel },
              }}
              placeholder="Take a note..."
              inputRef={textFieldEl}
            />
          </Grid>
          {isFocused ? (
            <Grid
              container
              justify="space-between"
              alignItems="center"
              style={{ padding: '10px 10px 0 10px' }}
            >
              <Grid item>
                <span>test</span>
              </Grid>
              <Grid item>
                <Button onClick={() => setIsFocused(false)} color="inherit">Close</Button>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Paper>
    </ClickAwayListener>
  );
};

export default CreateNote;
