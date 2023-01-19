import { FETCH_USER_UI } from '../types';

export const fetchUserUi =
  () =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
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
