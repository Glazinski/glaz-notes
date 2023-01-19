import { MOVE_NOTE_BACK, SET_NOTE_ERRORS } from '../types';

export const moveNoteBack =
  (noteId, src, destination) =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userId = firebase.auth().currentUser.uid;

    dispatch({ type: MOVE_NOTE_BACK });

    let note = {};

    firestore
      .collection(src)
      .doc(userId)
      .collection('userNotes')
      .doc(noteId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          note = { ...doc.data() };
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
