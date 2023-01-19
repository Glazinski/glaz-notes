import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './auth/rootReducer';
import notesReducer from './notes/rootReducer';
import labelsReducer from './labels/rootReducer';
import uiReducer from './ui/rootReducer';

export default combineReducers({
  ui: uiReducer,
  notes: notesReducer,
  auth: authReducer,
  labels: labelsReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
