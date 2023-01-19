import { deleteImage } from './deleteImage';
import { fetchNote } from './fetchNote';
import { LOADING_NOTE_IMAGE, LOADING_NOTE_IMAGE_FINISH } from '../types';
import notesAPI from '../../../api/notesAPI';

export const uploadNoteImage =
  (noteId, fd, coll) =>
  (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    const imageUrl =
      getState().notes.notes[noteId].imageUrl.length > 0
        ? getState().notes.notes[noteId].imageUrl
        : false;

    if (imageUrl) {
      dispatch(deleteImage(noteId, coll, imageUrl));
    }

    dispatch({
      type: LOADING_NOTE_IMAGE,
      payload: {
        noteId,
      },
    });
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then((idToken) =>
        notesAPI.post('/notes/image', fd, {
          headers: {
            Authorization: `Bearer ${idToken}`,
            noteId,
            coll,
          },
        })
      )
      .then(() => {
        dispatch(fetchNote(noteId, coll));
        dispatch({
          type: LOADING_NOTE_IMAGE_FINISH,
          payload: {
            noteId,
          },
        });
      })
      .catch((err) => console.log(err));
  };
