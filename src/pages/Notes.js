import React from 'react';
import NotesList from '../components/notes/NotesList';
import CreateNote from '../components/notes/CreateNote';

const Notes = (props) => (
  <>
    <CreateNote />
    <NotesList {...props} />
  </>
);

export default Notes;
