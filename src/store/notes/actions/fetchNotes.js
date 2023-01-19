import { NOTES_LOADING, SET_FILTERED_NOTES, NOTES_FETCHED } from '../types';

export const fetchNotes =
  (coll, labelId) =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userId = firebase.auth().currentUser.uid;
    dispatch({ type: NOTES_LOADING });
    dispatch({ type: SET_FILTERED_NOTES, payload: { filteredNotes: {} } });

    if (labelId) {
      const labelRef = firestore
        .collection('labels')
        .doc(userId)
        .collection('userLabels')
        .doc(labelId);
      let arrOfNoteIds = [];
      labelRef
        .get()
        .then((doc) => {
          arrOfNoteIds = doc.data().noteIds;

          if (arrOfNoteIds.length > 0) return arrOfNoteIds;

          dispatch({ type: NOTES_FETCHED, payload: {} });
          return null;
        })
        .then((querySnapshot) => {
          let notes = {};

          if (querySnapshot) {
            querySnapshot.forEach((noteId) =>
              firestore
                .collection('notes')
                .doc(userId)
                .collection('userNotes')
                .doc(noteId)
                .get()
                .then((noteDoc) => {
                  if (noteDoc.data()) {
                    notes = {
                      ...notes,
                      [noteDoc.data().id]: { ...noteDoc.data() },
                    };
                    dispatch({ type: NOTES_FETCHED, payload: notes });
                  }
                })
                .catch((error) => {
                  console.log('Error getting document:', error);
                })
            );
          }

          return null;
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });

      return;
    }

    firestore
      .collection(coll)
      .doc(userId)
      .collection('userNotes')
      .orderBy('createdAt', 'desc')
      .get()
      .then((querySnapshot) => {
        let notes = {};

        querySnapshot.forEach((doc) => {
          notes = { ...notes, [doc.id]: doc.data() };
        });

        return dispatch({ type: NOTES_FETCHED, payload: notes });
      })
      .catch((err) => console.log(err));
  };
