import React, { useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NotesList from '../components/notes/NotesList';
import { deleteNotesForever } from '../store/actions/notesActions';
import Confirm from '../components/Confirm';

// MUI
import Button from '@material-ui/core/Button';

const Bin = (props) => {
  const { deleteNotesForever, notesLength } = props;

  const [open, setOpen] = useState(false);
  const msg = 'Empty bin? All notes in Recycle Bin will be permanently deleted.';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteNotesForever();
    handleClose();
  };

  return (
    <>
      {notesLength > 0 ? (
        <>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <Button color="secondary" onClick={handleClickOpen}>Empty Bin</Button>
          </div>
          <Confirm open={open} handleClose={handleClose} handleDelete={handleDelete} msg={msg} />
        </>
      ) : null}
      <NotesList {...props} />
    </>
  );
};

Bin.propTypes = {
  deleteNotesForever: PropTypes.func.isRequired,
  notesLength: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  notesLength: _.values(state.notes.notes).length,
});

export default connect(mapStateToProps, { deleteNotesForever })(Bin);
