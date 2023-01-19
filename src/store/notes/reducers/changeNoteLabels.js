export const changeNoteLabels = (state, action) => {
  const { noteId, newLabels } = action.payload;

  return {
    ...state,
    notes: {
      ...state.notes,
      [noteId]: {
        ...state.notes[noteId],
        labels: [...newLabels],
      },
    },
  };
};
