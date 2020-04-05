import {
  SET_NOTE,
  SET_NOTE_ERRORS,
  NOTE_MOVED,
  NOTE_MOVED_CLEAR,
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
      // ...note,
      title: note.title,
      content: note.content,
      id: noteId,
      createdAt: new Date(),
    })
    .then(() => dispatch({ type: SET_NOTE }))
    .catch((err) => dispatch({ type: SET_NOTE_ERRORS, payload: err }));
};

export const noteMovedClear = () => ({
  type: NOTE_MOVED_CLEAR,
});

export const moveNoteFromTo = (noteId, src, destination, msg = null, newFormData = null) => (
  dispatch, getState, { getFirebase, getFirestore },
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;

  let note = {};

  if (newFormData) {
    dispatch(createNote(noteId, newFormData));
  }

  dispatch(noteMovedClear);

  dispatch({
    type: NOTE_MOVED,
    payload: {
      from: src,
      to: destination,
      msg,
      noteId,
    },
  });

  firestore
    .collection(src)
    .doc(userId)
    .collection('userNotes')
    .doc(noteId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        note = { ...doc.data() };
        return firestore
          .collection(destination).doc(userId)
          .collection('userNotes').doc(noteId)
          .set({
            ...note,
          });
      }
      return console.log('No such document');
    })
    .then(() => {
      firestore
        .collection(src)
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
