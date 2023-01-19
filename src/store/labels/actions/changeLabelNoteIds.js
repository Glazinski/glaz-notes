import { ADD_NOTE_TO_LABEL } from '../types';

export const changeLabelNoteIds =
  (labelId, newNoteIds) =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
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

    const label = firestore
      .collection('labels')
      .doc(userId)
      .collection('userLabels')
      .doc(labelId);
    return label
      .update({
        noteIds: newNoteIds,
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };
