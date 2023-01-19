export const moveNoteBack = (state) => ({
  ...state,
  notes: {
    [state.noteMoved.noteId]: state.noteMoved.note,
    ...state.notes,
  },
  noteMoved: { open: false },
});
