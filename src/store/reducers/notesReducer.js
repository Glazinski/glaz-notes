import {
  SET_NOTE,
  SET_NOTE_ERRORS,
  NOTE_MOVED,
  NOTE_MOVED_CLEAR,
} from '../types';

const initState = {
  errors: null,
  loading: false,
  noteMoved: {
    open: false,
  },
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_NOTE:
      return { ...state, errors: null };

    case SET_NOTE_ERRORS:
      return { ...state, errrors: action.payload };

    case NOTE_MOVED:
      return { ...state, noteMoved: { ...action.payload, open: true } };

    case NOTE_MOVED_CLEAR:
      return { ...state, noteMoved: { open: false } };

    default:
      return state;
  }
};
