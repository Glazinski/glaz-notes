import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import NoteSettings from './NoteSettings';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '5px',
  },
  paper: {
    maxWidth: 520,
    backgroundColor: theme.palette.background.default,
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    margin: '0 auto 80px auto',
  },
  textField: {
    borderBottom: 'none',
    padding: '0 10px 0 10px',
  },
  button: {
    color: theme.palette.text.primary,
  },
  textFieldLabel: {
    '&::placeholder': {
      color: theme.palette.text.primary,
    },
    resize: {
      fontSize: 5,
    },
  },
}));

const NoteForm = (props) => {
  const {
    formData: { title, content }, handleChange, handleClose, noteId, isRemovable, handleHoverClose,
  } = props;
  const classes = useStyles();
  const textFieldEl = useRef(null);

  useEffect(() => {
    textFieldEl.current.focus();
  }, []);

  return (
    <Grid
      className={classes.root}
      container
      justif="center"
      direction="column"
    >
      <Grid item>
        <TextField
          onChange={handleChange}
          name="title"
          value={title}
          className={classes.textField}
          InputProps={{ disableUnderline: true, classes: { input: classes.textFieldLabel } }}
          placeholder="Title"
          style={{ marginBottom: '20px' }}
          fullWidth
          multiline
        />
      </Grid>

      <Grid item>
        <TextField
          onChange={handleChange}
          name="content"
          value={content}
          id="resized-label"
          className={classes.textField}
          InputProps={{
            disableUnderline: true,
            classes: { input: classes.textFieldLabel },
          }}
          placeholder="Take a note..."
          inputRef={textFieldEl}
          multiline
          fullWidth
        />

      </Grid>

      <Grid
        container
        justify="space-between"
        alignItems="center"
        style={{ padding: '10px 10px 0 10px' }}
      >
        <Grid item>
          <NoteSettings
            noteId={noteId}
            isHovered
            isRemovable={isRemovable}
            handleHoverClose={handleHoverClose}
          />
        </Grid>
        <Grid item>
          <Button onClick={() => handleClose()} color="inherit">Close</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

NoteForm.defaultProps = {
  noteId: null,
  handleHoverClose: null,
};

NoteForm.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  noteId: PropTypes.string,
  isRemovable: PropTypes.bool.isRequired,
  handleHoverClose: PropTypes.func,
};

export default NoteForm;
