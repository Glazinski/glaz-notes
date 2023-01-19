export const fetchNote = (state, action) => ({
  ...state,
  notes: {
    ...state.notes,
    [action.payload.id]: { ...action.payload },
  },
});
