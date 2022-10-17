import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import NotesList from '../components/notes/NotesList';
import { deleteNotesForever } from '../store/actions/notesActions';
import Confirm from '../components/Confirm';

// MUI
import Button from '@material-ui/core/Button';

const Bin = (props) => {
  const dispatch = useDispatch();
  const notesLength = useSelector(
    (state) => _.values(state.notes.notes).length
  );
  const [open, setOpen] = useState(false);
  const msg =
    'Empty bin? All notes in Recycle Bin will be permanently deleted.';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteNotesForever());
    handleClose();
  };

  return (
    <>
      {notesLength > 0 && (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button color="secondary" onClick={handleClickOpen}>
              Empty Bin
            </Button>
          </div>
          <Confirm
            open={open}
            handleClose={handleClose}
            handleDelete={handleDelete}
            msg={msg}
          />
        </>
      )}
      <NotesList {...props} />
    </>
  );
};

export default Bin;
