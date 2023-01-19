import { STAR_NOTE, SET_NOTE, SET_NOTE_ERRORS } from '../types';

export const starNote =
  (noteId, newIsStarred, coll) =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userId = firebase.auth().currentUser.uid;

    dispatch({
      type: STAR_NOTE,
      payload: {
        noteId,
        newIsStarred,
      },
    });

    const note = firestore
      .collection(coll)
      .doc(userId)
      .collection('userNotes')
      .doc(noteId);

    return note
      .update({
        isStarred: newIsStarred,
      })
      .then(() => {
        dispatch({ type: SET_NOTE });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: SET_NOTE_ERRORS, payload: err });
      });
  };
