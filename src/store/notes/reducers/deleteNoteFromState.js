import _ from 'lodash';

export const deleteNoteFromState = (state, action) => ({
  ...state,
  notes: _.omit(state.notes, action.payload.noteId),
});
