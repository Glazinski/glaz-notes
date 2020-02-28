import {
  SET_ERRORS,
  CLEAR_ERRORS,
} from '../actions/types';

const initState = {
  authErrors: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case CLEAR_ERRORS:
      console.log('login success');
      return { ...state, authErrors: null };

    case SET_ERRORS:
      console.log('login failed', action.err);
      return { ...state, authErrors: action.err };

    default:
      return state;
  }
};
