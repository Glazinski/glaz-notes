import { CLEAR_ERRORS } from '../types';
import history from '../../../lib/router/history';

export const signOut =
  () =>
  async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    // TODO: Fix bux with cannot get
    await firebase.auth().signOut();
    dispatch({ type: CLEAR_ERRORS });
    history.push('/login');

    // Reload the page to clear dom
    window.location.reload();
  };
