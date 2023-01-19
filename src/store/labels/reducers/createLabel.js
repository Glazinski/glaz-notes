export const createLabel = (state, action) => ({
  ...state,
  labels: {
    ...state.labels,
    [action.payload.labelId]: action.payload,
  },
});
