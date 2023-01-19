export const editLabelName = (state, action) => ({
  ...state,
  labels: {
    ...state.labels,
    [action.payload.labelId]: {
      ...state.labels[action.payload.labelId],
      labelName: action.payload.newLabelName,
    },
  },
});
