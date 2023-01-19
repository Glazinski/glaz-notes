export const setColors = (state, action) => ({
  ...state,
  colors: action.payload.colors,
});
