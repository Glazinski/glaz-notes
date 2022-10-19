import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import ChipList from './labels/ChipList';
import ImageContainer from '../ImageContainer';
import NoteSettings from './NoteSettings';
import CustomSnackbar from '../CustomSnackbar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing(2),
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
  setContainer: {
    display: 'flex',
    justifContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  date: {
    color: theme.palette.text.disabled,
  },
  footer: {
    marginTop: 'auto',
  },
}));

const NoteForm = (props) => {
  const {
    note: { id, title, content, labels, imageUrl },
    handleChange,
    handleClose,
    handleLabels,
    handleImageDelete,
    date,
    image,
    formClassName,
  } = props;
  const classes = useStyles();
  const textFieldEl = useRef(null);
  const { pathname } = useLocation();
  const isBin = pathname === '/bin';
  const [open, setOpen] = useState(false);
  const imgSrc = image || imageUrl || null;

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
    <div className={formClassName || classes.root}>
      <ImageContainer
        id={id}
        imageUrl={imgSrc}
        handleImageDelete={handleImageDelete}
      />
      <div>
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
          multiline
          disabled={isBin}
        />
      </div>

      <div>
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
      </div>

      <div className={classes.footer}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '10px 0',
          }}
        >
          <ChipList handleLabels={handleLabels} labels={labels} />
          <div>
            {date && (
              <Typography
                style={{ marginTop: '10px' }}
                className={classes.date}
                variant="caption"
              >
                Created at {date}
              </Typography>
            )}
          </div>
        </div>

        <div className={classes.setContainer}>
          <NoteSettings {...props} isHovered />
          <div
            style={{ flexGrow: 4, display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button onClick={handleClose} color="inherit">
              Close
            </Button>
          </div>
        </div>
      </div>

      <CustomSnackbar
        info
        msg="Can't edit in Recycle Bin"
        open={open}
        handleClick={handleClick}
        handleClose={handleSnackClose}
      />
    </div>
  );
};

NoteForm.defaultProps = {
  date: null,
  title: null,
  content: null,
  image: null,
  formClassName: null,
};

NoteForm.propTypes = {
  note: PropTypes.oneOfType([PropTypes.object]).isRequired,
  formClassName: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleLabels: PropTypes.func.isRequired,
  handleImageDelete: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
  image: PropTypes.string,
};

export default NoteForm;
