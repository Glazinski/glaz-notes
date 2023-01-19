import _ from 'lodash';

export const loadingNoteImageFinish = (state, action) => {
  const { noteId } = action.payload;

  return {
    ...state,
    loadingNoteImage: _.without(state.loadingNoteImage, noteId),
  };
};
