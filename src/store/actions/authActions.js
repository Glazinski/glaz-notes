import {
  SET_ERRORS,
  CLEAR_ERRORS,
} from './types';
import history from '../../utils/history';

export const signIn = (credentials) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  firebase.auth().signInWithEmailAndPassword(
    credentials.email,
    credentials.password,
  ).then(() => {
    dispatch({ type: CLEAR_ERRORS });
  }).catch((err) => dispatch({ type: SET_ERRORS, err }));
};

export const signOut = () => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  await firebase.auth().signOut();
  dispatch({ type: CLEAR_ERRORS });
  history.push('/login');
};
