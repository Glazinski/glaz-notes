import {
  FETCH_USER_UI,
  CHANGE_THEME,
  SET_COLORS,
  CHANGE_VIEW,
} from '../types';

export const fetchUserUi = () => (
  dispatch, getState, { getFirebase, getFirestore },
) => {
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

      const { theme, view } = snapshot.data();
      return dispatch({
        type: FETCH_USER_UI,
        payload: {
          theme,
          view,
        },
      });
    })
    .catch((err) => console.error('Error during fetching theme', err));
};

export const changeTheme = (newTheme) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;

  const themeRef = firestore.collection('users').doc(userId);

  dispatch({ type: CHANGE_THEME, payload: newTheme });

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

export const changeView = (newView) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const userId = firebase.auth().currentUser.uid;

  const viewRef = firestore.collection('users').doc(userId);

  dispatch({ type: CHANGE_VIEW, payload: { newView } });

  return viewRef.update({
    view: newView,
  })
    .catch((err) => console.error('Error updating document: ', err));
};
