import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import NoteSettings from './NoteSettings';
import CustomSnackbar from '../CustomSnackbar';
import ChipList from './labels/ChipList';
import ImageContainer from '../ImageContainer';
import { useLocation } from 'react-router-dom';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: '10px',
    height: '100%',
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
  image: {
    width: '100%',
    // margin: 'auto',
    // display: 'block',
    // maxWidth: '100%',
    // maxHeight: '100%',
  },
  footer: {
    marginTop: 'auto',
    // alignSelf: 'flex-end',
  },
}));

const NoteForm = (props) => {
  const {
    note: {
      title, content, labels, imageUrl,
    },
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
  const elo = image || (imageUrl || null);

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
    <div
      className={classes.root}
    >
      {/* <ImageContainer imageUrl={imageUrl} /> */}
      {elo ? (
        <div style={{ marginBottom: 5 }}>
          {/* <div style={{ width: '100%', height: '100%' }}> */}
          <img className={classes.image} src={elo} alt="" />
          {/* </div> */}
        </div>
      ) : null}
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
          // fullWidth
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
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '10px 0',
        }}
        >
          {/* <div> */}
          <ChipList
            handleLabels={handleLabels}
            labels={labels}
          />
          {/* </div> */}
          <div>
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
          </div>
        </div>

        <div
          className={classes.setContainer}
        >
          {/* <div> */}
          <NoteSettings
            {...props}
            isHovered
          />
          {/* </div> */}
          <div style={{ flexGrow: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} color="inherit">Close</Button>
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
};

NoteForm.propTypes = {
  note: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleLabels: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
  image: PropTypes.string,
};

export default NoteForm;
