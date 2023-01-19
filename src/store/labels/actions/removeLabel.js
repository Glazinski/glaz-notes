import _ from 'lodash';
import { SET_NOTES } from '../../notes/types';
import { DELETE_LABEL } from '../types';
import history from '../../../utils/history';

export const removeLabel =
  (labelId, move) =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userId = firebase.auth().currentUser.uid;
    const { noteIds: labelNoteIds } = getState().labels.labels[labelId];

    const changedNotes = labelNoteIds.map((noteId) => {
      let newNote = getState().notes.notes[noteId];
      newNote = {
        ...newNote,
        labels: _.without(newNote.labels, labelId),
      };
      return newNote;
    });

    dispatch({
      type: SET_NOTES,
      payload: {
        changedNotes: _.keyBy(changedNotes, 'id'),
      },
    });

    firestore
      .collection('labels')
      .doc(userId)
      .collection('userLabels')
      .doc(labelId)
      .get()
      .then((doc) => {
        const { noteIds } = doc.data();
        if (noteIds.length > 0) {
          return noteIds.forEach((noteId) => {
            firestore
              .collection('notes')
              .doc(userId)
              .collection('userNotes')
              .doc(noteId)
              .update({
                labels: firestore.FieldValue.arrayRemove(labelId),
              });
          });
        }

        return null;
      })
      .then(() =>
        firestore
          .collection('labels')
          .doc(userId)
          .collection('userLabels')
          .doc(labelId)
          .delete()
      )
      .then(() => {
        if (move) {
          history.push('/');
        }
        dispatch({
          type: DELETE_LABEL,
          payload: {
            labelId,
          },
        });
      })
      .catch((err) => console.log(err));
  };
