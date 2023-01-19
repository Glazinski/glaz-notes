export const clearErrors = (state) => ({
  ...state,
  authErrors: null,
  loading: false,
});
