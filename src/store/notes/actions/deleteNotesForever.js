import _ from 'lodash';
import { DELETE_NOTES_FOREVER } from '../types';

export const deleteNotesForever =
  () =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userId = firebase.auth().currentUser.uid;
    const noteIds = Object.getOwnPropertyNames(getState().notes.notes);

    dispatch({ type: DELETE_NOTES_FOREVER });

    _.values(getState().notes.notes).forEach((note) => {
      const { id: noteId, labels } = note;
      if (labels.length > 0) {
        labels.forEach((labelId) => {
          firestore
            .collection('labels')
            .doc(userId)
            .collection('userLabels')
            .doc(labelId)
            .update({
              noteIds: firestore.FieldValue.arrayRemove(noteId),
            })
            .catch((err) => console.log(err));
        });
      }
    });

    noteIds.forEach((id) => {
      firestore
        .collection('bin')
        .doc(userId)
        .collection('userNotes')
        .doc(id)
        .delete();
    });
  };
