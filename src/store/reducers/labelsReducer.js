import {
  FETCH_LABELS,
  CREATE_LABEL,
} from '../types';

const initState = {
  labels: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_LABELS:
      // console.log(action);
      return { ...state, labels: { ...action.payload } };

    case CREATE_LABEL:
      // console.log(state, action);
      return { ...state };

    default:
      return { ...state };
  }
};
