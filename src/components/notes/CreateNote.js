import React, { useState, useRef } from 'react';
import CreateList from './CreateList';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// MUI icons
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    maxWidth: 520,
    // padding: theme.spacing(1),
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
  const [isListMode, setIsListMode] = useState(false);

  const handleFocus = () => {
    textFieldEl.current.focus();
    setIsFocused(true);
  };

  const handleMode = () => {
    setIsListMode(false);
    setIsFocused(false);
  };

  return (
    <ClickAwayListener onClickAway={() => handleMode()}>
      <Paper
        onClick={!isFocused ? handleFocus : null}
        className={classes.paper}
        elevation={5}
        // style={isFocused ? { padding: '10px' } : null}
      >
        <Grid
          style={isFocused ? { padding: '10px' } : null}
          container
          justif="center"
          direction="column"
        >
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
          <Grid container justify="space-between" alignItems="center">
            {isListMode ? (
              <Grid item>
                <CreateList />
              </Grid>
            ) : (
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
                  style={!isFocused ? { marginLeft: '20px' } : null}
                />
              </Grid>
            )}
            {!isFocused ? (
              <Grid item>
                <Tooltip title="New list" aria-label="New list" placement="bottom">
                  <IconButton
                    onClick={() => setIsListMode(!isListMode)}
                    style={!isFocused ? { marginRight: '20px' } : null}
                  >
                    <CheckBoxOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            ) : null}
          </Grid>
          {/* <Grid item>

          </Grid> */}
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
                <Button onClick={() => handleMode()} color="inherit">Close</Button>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Paper>
    </ClickAwayListener>
  );
};

export default CreateNote;