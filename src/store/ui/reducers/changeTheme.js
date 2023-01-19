export const changeTheme = (state, action) => {
  const { newTheme } = action.payload;
  return { ...state, theme: newTheme };
};
