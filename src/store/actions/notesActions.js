import {
  LOADING_UI,
  CREATE_NOTE,
  FETCH_NOTES,
  LOADING_SUCCESS,
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
export const fetchNotes = (coll) => (dispatch, getState, { getFirebase, getFirestore }) => {
  dispatch({ type: LOADING_UI });
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;
  console.log(userId);

  firestore.collection(`${coll}`)
    .doc(userId)
    .collection('userNotes')
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      let data = {};

      snapshot.forEach((doc) => {
        console.log(doc.data());
        data = { ...data, [doc.data().id]: { ...doc.data() } };
      });

      dispatch({ type: FETCH_NOTES, payload: data });
      dispatch({ type: LOADING_SUCCESS });
    })
    .catch((err) => console.log('Error getting documents', err));

  // firestore.collection('notes').where('userId', '==', userId).get()
  //   .then((snapshot) => {
  //     if (snapshot.empty) {
  //       console.log('No matching documents.');
  //       return;
  //     }

  //     let data = {};

  //     snapshot.forEach((doc) => {
  //       // console.log(doc.data());
  //       data = { ...data, [doc.data().id]: { ...doc.data() } };
  //     });

  //     dispatch({ type: FETCH_NOTES, payload: data });
  //     dispatch({ type: LOADING_SUCCESS });
  //   })
  //   .catch((err) => console.log('Error getting documents', err));
};

export const createNote = (noteId, note) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;
  // console.log(noteId);
  firestore.collection('notes')
    .doc(userId)
    .collection('userNotes')
    .doc(noteId)
    .set({
      ...note,
      id: noteId,
      // inBin: false,
      // userId,
      createdAt: new Date(),
    })
    .then(() => dispatch({ type: CREATE_NOTE }))
    .catch((err) => dispatch({ type: CREATE_NOTE_ERROR, payload: err }));
};

export const moveToBin = (noteId) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;

  let note = {};

  firestore
    .collection('notes')
    .doc(userId)
    .collection('userNotes')
    .doc(noteId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log(doc.data());
        note = { ...doc.data() };
        return firestore
          .collection('bin').doc(userId)
          .collection('userNotes').doc(noteId)
          .set({
            ...note,
          });
      }
      return console.log('No such document');
    })
    .then(() => {
      firestore
        .collection('notes')
        .doc(userId)
        .collection('userNotes')
        .doc(noteId)
        .delete();
    })
    .catch((err) => console.log(err));
};

export const deleteForever = (noteId) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;

  firestore
    .collection('bin')
    .doc(userId)
    .collection('userNotes')
    .doc(noteId)
    .delete();
};

export const restore = (noteId) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;

  let note = {};

  firestore
    .collection('bin')
    .doc(userId)
    .collection('userNotes')
    .doc(noteId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log(doc.data());
        note = { ...doc.data() };
        return firestore
          .collection('notes').doc(userId)
          .collection('userNotes').doc(noteId)
          .set({
            ...note,
          });
      }
      return console.log('No such document');
    })
    .then(() => {
      firestore
        .collection('bin')
        .doc(userId)
        .collection('userNotes')
        .doc(noteId)
        .delete();
    })
    .catch((err) => console.log(err));
};
