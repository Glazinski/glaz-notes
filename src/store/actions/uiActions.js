import {
  FETCH_THEME,
  SET_COLORS,
} from '../types';

export const fetchTheme = () => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;

  firestore
    .collection('users')
    .doc(userId)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.');
      }

      const { theme } = snapshot.data();
      return dispatch({ type: FETCH_THEME, payload: theme });
    })
    .catch((err) => console.error('Error during fetching theme', err));
};

export const changeTheme = (newTheme) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;

  const themeRef = firestore.collection('users').doc(userId);

  dispatch({ type: FETCH_THEME, payload: newTheme });

  return themeRef.update({
    theme: newTheme,
  })
    .catch((err) => console.error('Error updating document: ', err));
};

export const setColors = (colors) => ({
  type: SET_COLORS,
  payload: {
    colors,
  },
});
