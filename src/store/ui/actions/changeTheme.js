import { CHANGE_THEME, SET_COLORS } from '../types';

export const changeTheme =
  (newTheme) =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userId = firebase.auth().currentUser.uid;

    const themeRef = firestore.collection('users').doc(userId);

    dispatch({ type: CHANGE_THEME, payload: { newTheme } });

    return themeRef
      .update({
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
