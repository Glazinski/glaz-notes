import notesAPI from '../../../api/notesAPI';

export const deleteImage =
  (noteId, coll, imageUrl) =>
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userId = firebase.auth().currentUser.uid;

    const data = {
      imageUrl,
    };

    firestore
      .collection(coll)
      .doc(userId)
      .collection('userNotes')
      .doc(noteId)
      .update({
        imageUrl: '',
      })
      .then(() => firebase.auth().currentUser.getIdToken(true))
      .then((idToken) => {
        if (idToken) {
          return notesAPI.delete('/notes/image/delete', {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
            data,
          });
        }
        return null;
      })
      .catch((err) => console.log(err));
  };
