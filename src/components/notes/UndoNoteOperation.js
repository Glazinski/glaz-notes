import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomSnackbar from '../CustomSnackbar';
import { moveNoteBack, moveNoteClear } from '../../store/actions/notesActions';

const UndoNoteOperation = (props) => {
  const {
    noteMoved: {
      open,
      from,
      to,
      noteId,
      msg,
    },
    moveNoteClear,
    moveNoteBack,
  } = props;

  const handleClose = () => moveNoteClear();

  const handleClick = () => {
    moveNoteBack(noteId, to, from);
  };

  return (
    <CustomSnackbar
      msg={msg}
      open={open}
      handleClick={handleClick}
      handleClose={handleClose}
    />
  );
};

const mapStateToProps = (state) => ({
  noteMoved: state.notes.noteMoved,
});

UndoNoteOperation.propTypes = {
  noteMoved: PropTypes.oneOfType([PropTypes.object]).isRequired,
  moveNoteClear: PropTypes.func.isRequired,
  moveNoteBack: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { moveNoteBack, moveNoteClear })(UndoNoteOperation);
