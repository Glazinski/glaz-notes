import { CREATE_NOTE, SET_NOTE, SET_NOTE_ERRORS } from '../types';

export const createNote =
  (noteId, note, applyDispatch) =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userId = firebase.auth().currentUser.uid;

    const newNote = {
      ...note,
      id: noteId,
      createdAt: new Date().toISOString(),
    };

    if (applyDispatch) dispatch({ type: CREATE_NOTE, payload: newNote });

    firestore
      .collection('notes')
      .doc(userId)
      .collection('userNotes')
      .doc(noteId)
      .set({
        ...newNote,
      })
      .then(() => dispatch({ type: SET_NOTE }))
      .catch((err) => dispatch({ type: SET_NOTE_ERRORS, payload: err }));
  };
