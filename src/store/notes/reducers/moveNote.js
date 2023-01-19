import _ from 'lodash';

export const moveNote = (state, action) => ({
  ...state,
  noteMoved: {
    ...action.payload,
    note: state.notes[action.payload.noteId],
    open: true,
  },
  notes: _.omit(state.notes, action.payload.noteId),
});
