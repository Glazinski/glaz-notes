import {
  LOADING_UI,
  LOADING_SUCCESS,
  LOADING_FAILURE,
  FETCH_THEME,
  SET_COLORS,
} from '../types';

const initState = {
  loading: false,
  theme: 'light',
  colors: {},
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

    case FETCH_THEME:
      return { ...state, theme: action.payload };

    case SET_COLORS:
      return { ...state, colors: action.payload.colors };

    default:
      return state;
  }
};
