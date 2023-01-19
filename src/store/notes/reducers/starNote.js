export const starNote = (state, action) => {
  const { noteId, newIsStarred } = action.payload;

  return {
    ...state,
    notes: {
      ...state.notes,
      [noteId]: {
        ...state.notes[noteId],
        isStarred: newIsStarred,
      },
    },
  };
};
