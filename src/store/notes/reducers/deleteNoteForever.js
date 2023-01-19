import _ from 'lodash';

export const deleteNoteForever = (state, action) => ({
  ...state,
  notes: _.omit(state.notes, action.payload),
});
