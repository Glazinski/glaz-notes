export const changeView = (state, action) => {
  const { newView } = action.payload;
  return { ...state, view: newView };
};
