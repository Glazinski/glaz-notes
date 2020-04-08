import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import notesReducer from './notesReducer';
import uiReducer from './uiReducer';
import labelsReducer from './labelsReducer';

export default combineReducers({
  ui: uiReducer,
  notes: notesReducer,
  auth: authReducer,
  labels: labelsReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
