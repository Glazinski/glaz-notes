import {
  LOADING_UI,
  LOADING_SUCCESS,
  LOADING_FAILURE,
} from '../types';

const initState = {
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOADING_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case LOADING_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null,
      };

    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
