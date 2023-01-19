import { CHANGE_NOTE_LABELS, SET_NOTE, SET_NOTE_ERRORS } from '../types';

export const changeNoteLabels =
  (noteId, newLabels) =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userId = firebase.auth().currentUser.uid;

    dispatch({
      type: CHANGE_NOTE_LABELS,
      payload: {
        noteId,
        newLabels,
      },
    });

    const note = firestore
      .collection('notes')
      .doc(userId)
      .collection('userNotes')
      .doc(noteId);

    return note
      .update({
        labels: newLabels,
      })
      .then(() => {
        dispatch({ type: SET_NOTE });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: SET_NOTE_ERRORS, payload: err });
      });
  };
