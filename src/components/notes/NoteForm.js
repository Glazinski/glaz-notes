import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import NoteSettings from './NoteSettings';
import CustomSnackbar from '../CustomSnackbar';
import ChipList from './labels/ChipList';
import { useLocation } from 'react-router-dom';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '10px',
    // objectFit: 'fill',
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
  date: {
    color: theme.palette.text.disabled,
  },
  image: {
    width: '100%',
    // margin: 'auto',
    // display: 'block',
    // maxWidth: '100%',
    // maxHeight: '100%',
  },
}));

const NoteForm = (props) => {
  const {
    note: { title, content, labels },
    handleChange,
    handleClose,
    handleLabels,
    date,
    image,
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
      <div>
        {image ? (
          <Grid item>
            <div style={{ width: '100%', height: '100%' }}>
              <img className={classes.image} src={image} alt="" />
            </div>
          </Grid>
        ) : null}
        <Grid item>
          <TextField
            onClick={isBin ? handleClick : null}
            onChange={handleChange}
            name="title"
            value={title}
            className={classes.textField}
            InputProps={{
              disableUnderline: true,
              classes: { input: classes.textFieldLabel },
            }}
            placeholder="Title"
            style={{
              marginBottom: '20px',
              width: '96%',
            }}
          // fullWidth
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
        // justify="flex-end"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <ChipList
              handleLabels={handleLabels}
              labels={labels}
            />
          </Grid>
          {date ? (
            <Typography
              style={{ marginTop: '10px' }}
              className={classes.date}
              variant="caption"
            >
              Created at
              {' '}
              {date}
            </Typography>
          ) : null}
        </Grid>

        <Grid
          container
          justify="space-between"
          alignItems="center"
          style={{ padding: '10px 10px 0 10px' }}
        >
          <Grid item xs={6}>
            <NoteSettings
              {...props}
              isHovered
            />
          </Grid>
          <Grid item>
            <Button onClick={handleClose} color="inherit">Close</Button>
          </Grid>
        </Grid>

        <CustomSnackbar
          info
          msg="Can't edit in Recycle Bin"
          open={open}
          handleClick={handleClick}
          handleClose={handleSnackClose}
        />
      </div>
    </Grid>
  );
};

NoteForm.defaultProps = {
  date: null,
  title: null,
  content: null,
};

NoteForm.propTypes = {
  note: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleLabels: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,

};

export default NoteForm;
