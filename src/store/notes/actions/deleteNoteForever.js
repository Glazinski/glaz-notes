import { DELETE_NOTE_FOREVER } from '../types';
import notesAPI from '../../../api/notesAPI';

export const deleteNoteForever =
  (noteId) =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userId = firebase.auth().currentUser.uid;

    const imageUrl =
      getState().notes.notes[noteId].imageUrl.length > 0
        ? getState().notes.notes[noteId].imageUrl
        : false;

    // TODO:
    const noteLabels =
      getState().notes.notes[noteId].labels.length > 0
        ? getState().notes.notes[noteId].labels
        : null;

    if (noteLabels && noteLabels.length > 0) {
      noteLabels.forEach((labelId) => {
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

    const data = {
      imageUrl,
    };

    dispatch({ type: DELETE_NOTE_FOREVER, payload: noteId });

    firestore
      .collection('bin')
      .doc(userId)
      .collection('userNotes')
      .doc(noteId)
      .delete()
      .then(() => {
        if (imageUrl) {
          return firebase.auth().currentUser.getIdToken(true);
        }

        return null;
      })
      .then((idToken) => {
        if (idToken) {
          return notesAPI.delete('/notes/image/delete', {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
            data,
          });
        }
        return null;
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
