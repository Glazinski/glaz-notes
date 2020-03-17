import {
  LOADING_UI,
  FETCH_NOTES,
  LOADING_SUCCESS,
} from '../types';

// eslint-disable-next-line import/prefer-default-export
export const fetchNotes = () => (dispatch, getState, { getFirebase, getFirestore }) => {
  dispatch({ type: LOADING_UI });
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;
  console.log(userId);

  firestore.collection('notes').where('userId', '==', userId).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      let data = {};

      snapshot.forEach((doc) => {
        // console.log(doc.data());
        data = { ...data, [doc.data().id]: { ...doc.data() } };
      });

      dispatch({ type: FETCH_NOTES, payload: data });
      dispatch({ type: LOADING_SUCCESS });
    })
    .catch((err) => console.log('Error getting documents', err));
};
