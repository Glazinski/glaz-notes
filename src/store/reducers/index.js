import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import notesReducer from './notesReducer';
import uiReducer from './uiReducer';

export default combineReducers({
  ui: uiReducer,
  notes: notesReducer,
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
