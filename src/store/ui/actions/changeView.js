import { CHANGE_VIEW } from '../types';

export const changeView =
  (newView) =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userId = firebase.auth().currentUser.uid;

    const viewRef = firestore.collection('users').doc(userId);

    dispatch({ type: CHANGE_VIEW, payload: { newView } });

    return viewRef
      .update({
        view: newView,
      })
      .catch((err) => console.error('Error updating document: ', err));
  };
