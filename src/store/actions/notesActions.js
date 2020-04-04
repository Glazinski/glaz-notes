import {
  SET_NOTE,
  SET_NOTE_ERRORS,
} from '../types';

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
      createdAt: new Date(),
    })
    .then(() => dispatch({ type: SET_NOTE }))
    .catch((err) => dispatch({ type: SET_NOTE_ERRORS, payload: err }));
};

export const moveNoteToBin = (noteId) => (dispatch, getState, { getFirebase, getFirestore }) => {
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
    .catch((err) => {
      console.error(err);
      dispatch({ type: SET_NOTE_ERRORS, payload: err });
    });
};

export const deleteNoteForever = (noteId) => (
  dispatch, getState, { getFirebase, getFirestore },
) => {
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

export const restoreNote = (noteId) => (dispatch, getState, { getFirebase, getFirestore }) => {
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
    .catch((err) => {
      console.error(err);
      dispatch({ type: SET_NOTE_ERRORS, payload: err });
    });
};

export const updateNote = (noteId, newFormData) => (
  dispatch, getState, { getFirebase, getFirestore },
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;

  const note = firestore.collection('notes').doc(userId).collection('userNotes').doc(noteId);

  return note.update({
    ...newFormData,
  }).then(() => {
    dispatch({ type: SET_NOTE });
  }).catch((err) => {
    console.error(err);
    dispatch({ type: SET_NOTE_ERRORS, payload: err });
  });
};
