import { SET_ERRORS, CLEAR_ERRORS, LOADING_USER } from '../types';

const initState = {
  authErrors: null,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case CLEAR_ERRORS:
      return { ...state, authErrors: null, loading: false };

    case SET_ERRORS:
      return { ...state, authErrors: action.err, loading: false };

    case LOADING_USER:
      return { ...state, loading: true };

    default:
      return state;
  }
};
