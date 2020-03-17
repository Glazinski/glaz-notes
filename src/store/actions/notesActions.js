import {
  CREATE_NOTE,
  CREATE_NOTE_ERROR,
} from '../types';

// I found it unnecessary because i could fetch notes via firestoreConnect
// from react-redux-firebase but I'll leave it here, maybe it'll help somehow
// export const fetchNotes = () => (dispatch, getState, { getFirebase, getFirestore }) => {
//   dispatch({ type: LOADING_UI });
//   const firebase = getFirebase();
//   const firestore = getFirestore();
//   const userId = firebase.auth().currentUser.uid;
//   console.log(userId);

//   firestore.collection('notes').where('userId', '==', userId).get()
//     .then((snapshot) => {
//       if (snapshot.empty) {
//         console.log('No matching documents.');
//         return;
//       }

//       let data = {};

//       snapshot.forEach((doc) => {
//         // console.log(doc.data());
//         data = { ...data, [doc.data().id]: { ...doc.data() } };
//       });

//       dispatch({ type: FETCH_NOTES, payload: data });
//       dispatch({ type: LOADING_SUCCESS });
//     })
//     .catch((err) => console.log('Error getting documents', err));
// };

// eslint-disable-next-line import/prefer-default-export
export const createNote = (noteId, note) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;
  // console.log(noteId);
  firestore.collection('notes')
    .doc(noteId)
    .set({
      ...note,
      id: noteId,
      userId,
      createdAt: new Date(),
    })
    .then(() => dispatch({ type: CREATE_NOTE }))
    .catch((err) => dispatch({ type: CREATE_NOTE_ERROR, payload: err }));
};
