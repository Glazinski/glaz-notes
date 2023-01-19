export const setFilteredNotes = (state, action) => ({
  ...state,
  filteredNotes: {
    ...action.payload.filteredNotes,
  },
});
