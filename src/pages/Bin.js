import React from 'react';
import { connect } from 'react-redux';
import NotesList from '../components/notes/NotesList';
import { deleteNotesForever } from '../store/actions/notesActions';

const Bin = (props) => (
  <>
    {/* <button onClick={props.deleteNotesForever}>DeleteAll</button> */}
    <NotesList {...props} />
  </>
);

export default connect(null, { deleteNotesForever })(Bin);
