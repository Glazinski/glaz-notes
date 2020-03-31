import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import CreateList from './CreateList';
import uniqid from 'uniqid';

// Redux
import { connect } from 'react-redux';
import { createNote } from '../../store/actions/notesActions';

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
    backgroundColor: theme.palette.background.default,
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
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

const CreateNote = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const { title, content } = formData;

    // eslint-disable-next-line no-mixed-operators
    if (!isFocused && (title.length > 0 || content.length > 0) && !!title.trim().length || !!content.trim().length) {
      props.createNote(uniqid(), formData);
      setFormData({ title: '', content: '' });
    } else {
      setFormData({ title: '', content: '' });
    }
  }, [isFocused]);

  return (
    <ClickAwayListener onClickAway={() => handleMode()}>
      <Paper
        onClick={!isFocused ? handleFocus : null}
        className={classes.paper}
        elevation={5}
        variant="outlined"
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
                onChange={handleChange}
                name="title"
                value={formData.title}
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
                  onChange={handleChange}
                  name="content"
                  value={formData.content}
                  id={`${isFocused ? 'resized-label' : null}`}
                  className={classes.textField}
                  InputProps={{
                    disableUnderline: true,
                    classes: { input: classes.textFieldLabel },
                  }}
                  placeholder="Take a note..."
                  inputRef={textFieldEl}
                  style={!isFocused ? { marginLeft: '20px' } : null}
                  multiline
                  fullWidth
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

CreateNote.propTypes = {
  createNote: PropTypes.func.isRequired,
};

export default connect(null, { createNote })(CreateNote);
