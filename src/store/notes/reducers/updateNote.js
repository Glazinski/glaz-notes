export const updateNote = (state, action) => {
  const { noteId, title, content } = action.payload;

  return {
    ...state,
    notes: {
      ...state.notes,
      [noteId]: {
        ...state.notes[noteId],
        title,
        content,
      },
    },
  };
};
