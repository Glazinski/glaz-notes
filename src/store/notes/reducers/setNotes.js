export const setNotes = (state, action) => {
  const { changedNotes } = action.payload;
  return {
    ...state,
    notes: {
      ...state.notes,
      ...changedNotes,
    },
  };
};
