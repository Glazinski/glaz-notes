import { LOADING_USER, CLEAR_ERRORS, SET_ERRORS } from '../types';
import history from '../../../utils/history';

export const signIn =
  (credentials) =>
  (dispatch, getState, { getFirebase }) => {
    dispatch({ type: LOADING_USER });
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
      })
      .catch((err) => dispatch({ type: SET_ERRORS, err }));
  };
