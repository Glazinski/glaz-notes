import uniqid from 'uniqid';
import { CREATE_LABEL } from '../types';

export const createLabel =
  (labelName) =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
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

    firestore
      .collection('labels')
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
