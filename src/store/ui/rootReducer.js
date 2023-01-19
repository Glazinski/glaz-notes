import { FETCH_USER_UI, SET_COLORS, CHANGE_THEME, CHANGE_VIEW } from './types';
import { changeTheme } from './reducers/changeTheme';
import { changeView } from './reducers/changeView';
import { fetchUserUI } from './reducers/fetchUserUI';
import { setColors } from './reducers/setColors';

const initState = {
  theme: 'light',
  view: 'grid',
  colors: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_USER_UI:
      return fetchUserUI(state, action);

    case SET_COLORS:
      return setColors(state, action);

    case CHANGE_THEME:
      return changeTheme(state, action);

    case CHANGE_VIEW:
      return changeView(state, action);

    default:
      return state;
  }
};
