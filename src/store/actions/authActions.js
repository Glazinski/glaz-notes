import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_USER,
} from '../types';
import history from '../../utils/history';

export const signIn = (credentials) => (dispatch, getState, { getFirebase }) => {
  dispatch({ type: LOADING_USER });
  const firebase = getFirebase();

  firebase.auth().signInWithEmailAndPassword(
    credentials.email,
    credentials.password,
  ).then(() => {
    dispatch({ type: CLEAR_ERRORS });
    history.push('/');
  }).catch((err) => dispatch({ type: SET_ERRORS, err }));
};

export const signOut = () => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  // TODO: Fix bux with cannot get
  await firebase.auth().signOut();
  dispatch({ type: CLEAR_ERRORS });
  history.push('/login');

  // Reload the page to clear dom
  window.location.reload();
};

export const signUp = (newUser) => (dispatch, getState, { getFirebase, getFirestore }) => {
  dispatch({ type: LOADING_USER });
  const firebase = getFirebase();
  const firestore = getFirestore();

  firebase.auth().createUserWithEmailAndPassword(
    newUser.email,
    newUser.password,
  )
    .then((res) => firestore.collection('users').doc(res.user.uid).set({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      theme: 'light',
    }))
    .then(() => {
      history.push('/');
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => dispatch({ type: SET_ERRORS, err }));
};

export const clearForm = () => ({ type: CLEAR_ERRORS });
