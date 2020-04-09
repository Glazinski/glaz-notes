import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import NoteSettings from './NoteSettings';
import CustomSnackbar from '../CustomSnackbar';
import { useLocation } from 'react-router-dom';

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
    formData: { title, content },
    handleChange,
    handleClose,
    noteId,
    isRemovable,
    handleHoverClose,
  } = props;
  const classes = useStyles();
  const textFieldEl = useRef(null);
  const { pathname } = useLocation();
  const isBin = pathname === '/bin';
  const [open, setOpen] = useState(false);

  useEffect(() => {
    textFieldEl.current.focus();
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleSnackClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      className={classes.root}
      container
      justif="center"
      direction="column"
    >
      <Grid item>
        <TextField
          onClick={isBin ? handleClick : null}
          onChange={handleChange}
          name="title"
          value={title}
          className={classes.textField}
          InputProps={{ disableUnderline: true, classes: { input: classes.textFieldLabel } }}
          placeholder="Title"
          style={{ marginBottom: '20px' }}
          fullWidth
          multiline
          disabled={isBin}
        />
      </Grid>

      <Grid item>
        <TextField
          onClick={isBin ? handleClick : null}
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
          disabled={isBin}
        />
      </Grid>

      <Grid
        container
        justify="space-between"
        alignItems="center"
        style={{ padding: '10px 10px 0 10px' }}
      >
        <Grid item xs={6}>
          <NoteSettings
            formData={props.formData}
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
      <CustomSnackbar
        info
        msg="Can't edit in Recycle Bin"
        open={open}
        handleClick={handleClick}
        handleClose={handleSnackClose}
      />
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
