import { UPDATE_NOTE, SET_NOTE, SET_NOTE_ERRORS } from '../types';

export const updateNote =
  (noteId, newFormData, coll) =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userId = firebase.auth().currentUser.uid;

    dispatch({
      type: UPDATE_NOTE,
      payload: {
        noteId,
        ...newFormData,
      },
    });

    const note = firestore
      .collection(coll)
      .doc(userId)
      .collection('userNotes')
      .doc(noteId);

    return note
      .update({
        ...newFormData,
      })
      .then(() => {
        dispatch({ type: SET_NOTE });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: SET_NOTE_ERRORS, payload: err });
      });
  };
