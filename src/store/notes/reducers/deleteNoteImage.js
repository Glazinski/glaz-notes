export const deleteNoteImage = (state, action) => {
  const { noteId } = action.payload;
  return {
    ...state,
    notes: {
      ...state.notes,
      [noteId]: {
        ...state.notes[noteId],
        imageUrl: '',
      },
    },
  };
};
