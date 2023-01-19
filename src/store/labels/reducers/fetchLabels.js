export const fetchLabels = (state, action) => ({
  ...state,
  labels: { ...action.payload },
});
