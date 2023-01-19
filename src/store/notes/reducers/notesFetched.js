export const notesFetched = (state, action) => ({
  ...state,
  notes: action.payload,
  loading: false,
});
