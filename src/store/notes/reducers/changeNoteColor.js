export const changeNoteColor = (state, action) => {
  const { noteId, color } = action.payload;

  return {
    ...state,
    notes: {
      ...state.notes,
      [noteId]: {
        ...state.notes[noteId],
        colorName: color,
      },
    },
  };
};
