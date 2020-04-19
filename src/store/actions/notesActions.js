import {
  SET_NOTE,
  SET_NOTE_ERRORS,
  MOVE_NOTE,
  MOVE_NOTE_BACK,
  MOVE_NOTE_CLEAR,
  NOTES_LOADING,
  NOTES_FETCHED,
  CREATE_NOTE,
  DELETE_NOTE_FOREVER,
  UPDATE_NOTE,
  CHANGE_NOTE_COLOR,
  DELETE_NOTES_FOREVER,
  STAR_NOTE,
  CHANGE_NOTE_LABELS,
  DELETE_NOTE_FROM_STATE,
} from '../types';

export const fetchNotes = (coll, labelId) => (
  dispatch, getState, { getFirebase, getFirestore },
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;
  dispatch({ type: NOTES_LOADING });

  if (labelId) {
    const labelRef = firestore.collection('labels').doc(userId).collection('userLabels').doc(labelId);
    let arrOfNoteIds = [];
    labelRef
      .get()
      .then((doc) => {
        arrOfNoteIds = doc.data().noteIds;

        if (arrOfNoteIds.length > 0) {
          return firestore.collection('notes')
            .doc(userId)
            .collection('userNotes')
            .where('id', 'in', arrOfNoteIds)
            .orderBy('createdAt', 'desc')
            .get();
        }
        dispatch({ type: NOTES_FETCHED, payload: {} });
        return null;
      })
      .then((querySnapshot) => {
        let notes = {};

        querySnapshot.forEach((doc) => {
          notes = { ...notes, [doc.id]: doc.data() };
        });

        dispatch({ type: NOTES_FETCHED, payload: notes });
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  } else {
    firestore.collection(coll)
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
  }
};

export const createNote = (noteId, note) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;

  const newNote = {
    // title: note.title,
    // content: note.content,
    ...note,
    id: noteId,
    createdAt: new Date().toISOString(),
  };

  dispatch({ type: CREATE_NOTE, payload: newNote });

  firestore.collection('notes')
    .doc(userId)
    .collection('userNotes')
    .doc(noteId)
    .set({
      ...newNote,
    })
    .then(() => dispatch({ type: SET_NOTE }))
    .catch((err) => dispatch({ type: SET_NOTE_ERRORS, payload: err }));
};

export const moveNoteClear = () => ({
  type: MOVE_NOTE_CLEAR,
});

export const moveNoteBack = (noteId, src, destination) => (
  dispatch, getState, { getFirebase, getFirestore },
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;

  dispatch({ type: MOVE_NOTE_BACK });

  let note = {};

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

  dispatch({
    type: MOVE_NOTE,
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
        note = {
          ...doc.data(),
          // isStarred: destination === 'bin' ? false : doc.data().isStarred,
        };
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

  dispatch({ type: DELETE_NOTE_FOREVER, payload: noteId });

  firestore
    .collection('bin')
    .doc(userId)
    .collection('userNotes')
    .doc(noteId)
    .delete();
};

export const deleteNotesForever = () => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;
  const noteIds = Object.getOwnPropertyNames(getState().notes.notes);

  dispatch({ type: DELETE_NOTES_FOREVER });

  noteIds.forEach((id) => {
    firestore.collection('bin').doc(userId).collection('userNotes').doc(id)
      .delete();
  });
};

export const deleteNoteFromState = (noteId) => ({
  type: DELETE_NOTE_FROM_STATE,
  payload: { noteId },
});

export const updateNote = (noteId, newFormData, coll) => (
  dispatch, getState, { getFirebase, getFirestore },
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;

  dispatch({
    type: UPDATE_NOTE,
    payload: {
      noteId,
      ...newFormData,
    },
  });

  const note = firestore.collection(coll).doc(userId).collection('userNotes').doc(noteId);

  return note.update({
    ...newFormData,
  }).then(() => {
    dispatch({ type: SET_NOTE });
  }).catch((err) => {
    console.error(err);
    dispatch({ type: SET_NOTE_ERRORS, payload: err });
  });
};

export const changeNoteColor = (noteId, newColor, coll) => (
  dispatch, getState, { getFirebase, getFirestore },
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;

  const note = firestore.collection(coll).doc(userId).collection('userNotes').doc(noteId);

  dispatch({
    type: CHANGE_NOTE_COLOR,
    payload: {
      noteId,
      color: newColor,
    },
  });

  return note.update({
    colorName: newColor,
  }).then(() => {
    dispatch({ type: SET_NOTE });
  }).catch((err) => {
    console.error(err);
    dispatch({ type: SET_NOTE_ERRORS, payload: err });
  });

  // CHANGE_NOTE_COLOR
};

export const starNote = (noteId, newIsStarred, coll) => (
  dispatch, getState, { getFirebase, getFirestore },
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;

  dispatch({
    type: STAR_NOTE,
    payload: {
      noteId,
      newIsStarred,
    },
  });

  const note = firestore.collection(coll).doc(userId).collection('userNotes').doc(noteId);

  return note.update({
    isStarred: newIsStarred,
  }).then(() => {
    dispatch({ type: SET_NOTE });
  }).catch((err) => {
    console.error(err);
    dispatch({ type: SET_NOTE_ERRORS, payload: err });
  });
};

export const changeNoteLabels = (noteId, newLabels) => (
  dispatch, getState, { getFirebase, getFirestore },
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;

  dispatch({
    type: CHANGE_NOTE_LABELS,
    payload: {
      noteId,
      newLabels,
    },
  });

  const note = firestore.collection('notes').doc(userId).collection('userNotes').doc(noteId);

  return note.update({
    labels: newLabels,
  }).then(() => {
    dispatch({ type: SET_NOTE });
  }).catch((err) => {
    console.error(err);
    dispatch({ type: SET_NOTE_ERRORS, payload: err });
  });
};
