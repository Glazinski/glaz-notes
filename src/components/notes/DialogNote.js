import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NoteForm from './NoteForm';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import DialogWindow from '../DialogWindow';
import { deleteNoteImage, updateNote } from '../../store/actions/notesActions';

const useStyles = makeStyles((theme) => ({
  container: {
    width: 500,
    padding: '10px',
    overflowWrap: 'anywhere',
    transition: 'background-color .3s ease',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      padding: '0',
    },
  },
  dialog: {
    marginBottom: '200px',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      minHeight: '100vh',
    },
  },
}));

const DialogNote = (props) => {
  const {
    handleClose,
    open,
    color,
    coll,
    note,
    note: { id, content, title, createdAt },
  } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    title,
    content,
    ...note,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModalClose = () => {
    handleClose();
    if (formData.title !== title || formData.content !== content) {
      dispatch(updateNote(id, formData, coll));
    }
  };

  const handleImageDelete = () => {
    dispatch(deleteNoteImage(id, coll));
  };

  useEffect(() => setFormData({ ...note }), [note]);

  const date = createdAt ? moment(createdAt).format('MMM Do YY') : null;

  return (
    <DialogWindow
      handleClose={handleModalClose}
      open={open}
      isFullScreen={fullScreen}
    >
      <Paper
        className={classes.container}
        style={color ? { backgroundColor: color } : null}
      >
        <NoteForm
          {...props}
          handleChange={handleChange}
          handleClose={handleModalClose}
          handleImageDelete={handleImageDelete}
          date={date}
          note={formData}
          isMovable
          formClassName={classes.formContainer}
        />
      </Paper>
    </DialogWindow>
  );
};

DialogNote.defaultProps = {
  color: null,
  handleNoteMove: null,
  handleColor: null,
  handleStar: null,
  isStarred: null,
};

DialogNote.propTypes = {
  note: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  color: PropTypes.string,
  handleNoteMove: PropTypes.func,
  handleColor: PropTypes.func,
  handleStar: PropTypes.func,
  isStarred: PropTypes.bool,
  coll: PropTypes.string.isRequired,
};

export default DialogNote;
