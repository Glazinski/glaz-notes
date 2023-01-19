import { LOADING_USER, CLEAR_ERRORS, SET_ERRORS } from '../types';
import history from '../../../utils/history';

export const signUp =
  (newUser) =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: LOADING_USER });
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((res) =>
        firestore.collection('users').doc(res.user.uid).set({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          theme: 'light',
          view: 'grid',
        })
      )
      .then(() => {
        history.push('/');
        dispatch({ type: CLEAR_ERRORS });
      })
      .catch((err) => dispatch({ type: SET_ERRORS, err }));
  };
