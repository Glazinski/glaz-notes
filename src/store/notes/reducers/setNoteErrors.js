export const setNoteErrors = (state, action) => ({
  ...state,
  errors: action.payload,
});
