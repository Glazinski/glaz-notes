export const createNote = (state, action) => ({
  ...state,
  notes: { [action.payload.id]: action.payload, ...state.notes },
});
