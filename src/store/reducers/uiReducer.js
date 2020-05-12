import {
  FETCH_USER_UI,
  SET_COLORS,
  CHANGE_VIEW,
} from '../types';

const initState = {
  theme: 'light',
  colors: {},
  view: 'grid',
};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_USER_UI: {
      const { view, theme } = action.payload;
      return { ...state, view, theme };
    }

    case SET_COLORS:
      return { ...state, colors: action.payload.colors };

    case CHANGE_VIEW: {
      const { newView } = action.payload;
      return { ...state, view: newView };
    }

    default:
      return state;
  }
};
