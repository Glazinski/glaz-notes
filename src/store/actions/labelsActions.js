import uniqid from 'uniqid';
import {
  FETCH_LABELS,
  CREATE_LABEL,
  EDIT_LABEL_NAME,
  ADD_NOTE_TO_LABEL,
  OPEN_EDIT_LABELS,
  CLOSE_EDIT_LABELS,
} from '../types';

export const fetchLabels = () => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;

  firestore.collection('labels')
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

export const createLabel = (labelName) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;

  const newLabel = {
    labelId: uniqid(),
    labelName,
    noteIds: [],
    createdAt: new Date(),
  };

  dispatch({ type: CREATE_LABEL, payload: newLabel });

  firestore.collection('labels')
    .doc(userId)
    .collection('userLabels')
    .doc(newLabel.labelId)
    .set({
      ...newLabel,
    })
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

export const editLabelName = (labelId, newLabelName) => (
  dispatch, getState, { getFirebase, getFirestore },
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;

  dispatch({
    type: EDIT_LABEL_NAME,
    payload: {
      labelId,
      newLabelName,
    },
  });

  const labelRef = firestore.collection('labels').doc(userId).collection('userLabels').doc(labelId);

  return labelRef.update({
    labelName: newLabelName,
  })
    .then(() => {
      console.log('Document successfully updated!');
    })
    .catch((error) => {
    // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });
};

export const removeLabel = (labelName) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;
};

export const changeLabelNoteIds = (labelId, newNoteIds) => (
  dispatch, getState, { getFirebase, getFirestore },
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;

  dispatch({
    type: ADD_NOTE_TO_LABEL,
    payload: {
      labelId,
      newNoteIds,
    },
  });

  const label = firestore.collection('labels').doc(userId).collection('userLabels').doc(labelId);
  return label.update({
    noteIds: newNoteIds,
  }).then(() => {
    console.log('Document successfully updated!');
  })
    .catch((error) => {
    // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });
};

export const openEditLabels = () => ({
  type: OPEN_EDIT_LABELS,
});

export const closeEditLabels = () => ({
  type: CLOSE_EDIT_LABELS,
});
