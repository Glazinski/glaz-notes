export const loadingNoteImage = (state, action) => {
  const { noteId } = action.payload;

  return {
    ...state,
    loadingNoteImage: [...state.loadingNoteImage, noteId],
    notes: {
      ...state.notes,
      [noteId]: {
        ...state.notes[noteId],
        imageUrl: '',
      },
    },
  };
};
