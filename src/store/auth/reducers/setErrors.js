export const setErrors = (state, action) => ({
  ...state,
  authErrors: action.err,
  loading: false,
});
