import { DELETE_NOTE_FROM_STATE } from '../types';

export const deleteNoteFromState = (noteId) => ({
  type: DELETE_NOTE_FROM_STATE,
  payload: { noteId },
});
