import { EDIT_LABEL_NAME } from '../types';

export const editLabelName =
  (labelId, newLabelName) =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
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

    const labelRef = firestore
      .collection('labels')
      .doc(userId)
      .collection('userLabels')
      .doc(labelId);

    return labelRef
      .update({
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
