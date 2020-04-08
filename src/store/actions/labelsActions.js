import {
  FETCH_LABELS,
  CREATE_LABEL,
} from '../types';

export const fetchLabels = () => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;

  firestore.collection('labels')
    .doc(userId)
    .collection('userLabels')
    .get()
    .then((querySnapshot) => {
      let labels = {};

      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        labels = { [doc.data().labelName]: { ...doc.data() }, ...labels };
      });

      // console.log(labels);
      dispatch({ type: FETCH_LABELS, payload: labels });
    })
    .catch((err) => console.log(err));
};

export const createLabel = (labelName) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;

  dispatch({ type: CREATE_LABEL, payload: labelName });

  firestore.collection('labels')
    .doc(userId)
    .collection('userLabels')
    .doc(labelName)
    .set({
      labelName,
      noteIds: [],
    })
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

export const removeLabel = (labelName) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;
};
