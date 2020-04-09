import {
  FETCH_LABELS,
  CREATE_LABEL,
  EDIT_LABEL_NAME,
} from '../types';

const initState = {};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_LABELS:
      // console.log(action);
      return { ...state, ...action.payload };

    case CREATE_LABEL:
      // console.log(state, action);
      return {
        ...state,
        [action.payload.labelId]: action.payload,
      };

    case EDIT_LABEL_NAME:
      console.log(state);
      console.log(action);
      return {
        ...state,
        [action.payload.labelId]: {
          ...state[action.payload.labelId],
          labelName: action.payload.newLabelName,
        },
      };

    default:
      return { ...state };
  }
};
