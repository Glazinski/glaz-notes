export const addNoteToLabel = (state, action) => {
  const { labelId, newNoteIds } = action.payload;
  return {
    ...state,
    labels: {
      ...state.labels,
      [labelId]: {
        ...state.labels[labelId],
        noteIds: newNoteIds,
      },
    },
  };
};
