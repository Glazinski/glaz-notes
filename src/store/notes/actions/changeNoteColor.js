import { CHANGE_NOTE_COLOR, SET_NOTE, SET_NOTE_ERRORS } from '../types';

export const changeNoteColor =
  (noteId, newColor, coll) =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userId = firebase.auth().currentUser.uid;

    const note = firestore
      .collection(coll)
      .doc(userId)
      .collection('userNotes')
      .doc(noteId);

    dispatch({
      type: CHANGE_NOTE_COLOR,
      payload: {
        noteId,
        color: newColor,
      },
    });

    return note
      .update({
        colorName: newColor,
      })
      .then(() => {
        dispatch({ type: SET_NOTE });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: SET_NOTE_ERRORS, payload: err });
      });
  };
