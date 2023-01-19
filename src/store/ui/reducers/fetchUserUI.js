export const fetchUserUI = (state, action) => {
  const { view, theme } = action.payload;
  return { ...state, view, theme };
};
