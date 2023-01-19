import { SET_ERRORS, CLEAR_ERRORS, LOADING_USER } from './types';
import { clearErrors } from './clearErrors';
import { setErrors } from './setErrors';
import { loadingUser } from './loadingUser';

const initState = {
  authErrors: null,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case CLEAR_ERRORS:
      return clearErrors(state);

    case SET_ERRORS:
      return setErrors(state, action);

    case LOADING_USER:
      return loadingUser(state);

    default:
      return state;
  }
};
