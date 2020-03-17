import {
  FETCH_NOTES,
} from '../types';

const initState = {
  notes: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_NOTES:
      return { ...state, notes: action.payload };

    default:
      return state;
  }
};
