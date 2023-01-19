import { deleteImage } from './deleteImage';
import { DELETE_NOTE_IMAGE } from '../types';

export const deleteNoteImage = (noteId, coll) => (dispatch, getState) => {
  const imageUrl =
    getState().notes.notes[noteId].imageUrl.length > 0
      ? getState().notes.notes[noteId].imageUrl
      : false;

  dispatch({
    type: DELETE_NOTE_IMAGE,
    payload: {
      noteId,
    },
  });

  dispatch(deleteImage(noteId, coll, imageUrl));
};
