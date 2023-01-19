import { FETCH_NOTE } from '../types';

export const fetchNote =
  (noteId, coll) =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userId = firebase.auth().currentUser.uid;

    firestore
      .collection(coll)
      .doc(userId)
      .collection('userNotes')
      .doc(noteId)
      .get()
      .then((doc) => {
        dispatch({
          type: FETCH_NOTE,
          payload: {
            ...doc.data(),
          },
        });
      })
      .catch((err) => console.log(err));
  };
