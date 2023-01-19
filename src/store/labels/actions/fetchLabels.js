import { FETCH_LABELS } from '../types';

export const fetchLabels =
  () =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userId = firebase.auth().currentUser.uid;

    firestore
      .collection('labels')
      .doc(userId)
      .collection('userLabels')
      .orderBy('createdAt', 'desc')
      .get()
      .then((querySnapshot) => {
        let labels = {};

        querySnapshot.forEach((doc) => {
          labels = { [doc.data().labelId]: { ...doc.data() }, ...labels };
        });

        // console.log(labels);
        dispatch({ type: FETCH_LABELS, payload: labels });
      })
      .catch((err) => console.log(err));
  };
