import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DialogWindow from '../DialogWindow';
import NoteForm from './NoteForm';

// Redux
import { connect } from 'react-redux';
import { updateNote } from '../../store/actions/notesActions';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  container: {
    width: 500,
    heihgt: 200,
    padding: '10px',
    overflowWrap: 'anywhere',
  },
  dialog: {
    marginBottom: '200px',
  },
}));

const DialogNote = (props) => {
  const {
    noteId, content, title, handleClose, open, updateNote,
  } = props;
  const classes = useStyles();
  const [formData, setFormData] = useState({
    title,
    content,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModalClose = () => {
    handleClose();
    if (formData.title !== title || formData.content !== content) {
      updateNote(noteId, formData);
    }
  };

  return (
    <DialogWindow handleClose={handleModalClose} open={open}>
      <Paper className={classes.container}>
        <NoteForm
          noteId={noteId}
          formData={formData}
          handleChange={handleChange}
          handleClose={handleModalClose}
          isRemovable
        />
      </Paper>
    </DialogWindow>
  );
};

DialogNote.propTypes = {
  noteId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  updateNote: PropTypes.func.isRequired,
};

export default connect(null, { updateNote })(DialogNote);
