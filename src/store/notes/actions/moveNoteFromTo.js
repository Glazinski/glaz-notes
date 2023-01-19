import { createNote } from './createNote';
import { MOVE_NOTE, SET_NOTE_ERRORS } from '../types';

export const moveNoteFromTo =
  (noteId, src, destination, msg = null, newFormData = null) =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userId = firebase.auth().currentUser.uid;

    let note = {};

    if (newFormData) {
      dispatch(createNote(noteId, newFormData));
    }

    dispatch({
      type: MOVE_NOTE,
      payload: {
        from: src,
        to: destination,
        msg,
        noteId,
      },
    });

    firestore
      .collection(src)
      .doc(userId)
      .collection('userNotes')
      .doc(noteId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          note = {
            ...doc.data(),
          };
          return firestore
            .collection(destination)
            .doc(userId)
            .collection('userNotes')
            .doc(noteId)
            .set({
              ...note,
            });
        }
        return console.log('No such document');
      })
      .then(() => {
        firestore
          .collection(src)
          .doc(userId)
          .collection('userNotes')
          .doc(noteId)
          .delete();
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: SET_NOTE_ERRORS, payload: err });
      });
  };
