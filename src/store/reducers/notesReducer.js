import {
  SET_NOTE,
  SET_NOTE_ERRORS,
} from '../types';

const initState = {
  errors: null,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_NOTE:
      return { ...state, errors: null };

    case SET_NOTE_ERRORS:
      return { ...state, errrors: action.payload };

    default:
      return state;
  }
};
