import { SET_ERRORS, CLEAR_ERRORS, LOADING_USER } from './types';
import { clearErrors } from './reducers/clearErrors';
import { setErrors } from './reducers/setErrors';
import { loadingUser } from './reducers/loadingUser';

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
