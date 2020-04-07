import _ from 'lodash';
import {
  SET_NOTE,
  SET_NOTE_ERRORS,
  MOVE_NOTE,
  MOVE_NOTE_BACK,
  MOVE_NOTE_CLEAR,
  NOTES_LOADING,
  NOTES_FETCHED,
  CREATE_NOTE,
  DELETE_NOTE_FOREVER,
  UPDATE_NOTE,
} from '../types';

const initState = {
  notes: {},
  errors: null,
  loading: false,
  noteMoved: {
    open: false,
  },
};

export default (state = initState, action) => {
  switch (action.type) {
    case NOTES_FETCHED:
      return { ...state, notes: action.payload, loading: false };

    case NOTES_LOADING:
      return { ...state, loading: true };

    case CREATE_NOTE:
      return { ...state, notes: { [action.payload.id]: action.payload, ...state.notes } };

    case DELETE_NOTE_FOREVER:
      return { ...state, notes: _.omit(state.notes, action.payload) };

    case UPDATE_NOTE:
      return {
        ...state,
        notes: {
          ...state.notes,
          [action.payload.noteId]: {
            ...state.notes[action.payload.noteId],
            title: action.payload.title,
            content: action.payload.content,
          },
        },
      };

    case MOVE_NOTE:
      return {
        ...state,
        noteMoved: {
          ...action.payload,
          note: state.notes[action.payload.noteId],
          open: true,
        },
        notes: _.omit(state.notes, action.payload.noteId),
      };

    case MOVE_NOTE_BACK:
      return {
        ...state,
        notes: { [state.noteMoved.noteId]: state.noteMoved.note, ...state.notes },
        noteMoved: { open: false },
      };

    case MOVE_NOTE_CLEAR:
      return { ...state, noteMoved: { open: false } };

    case SET_NOTE:
      return { ...state, errors: null };

    case SET_NOTE_ERRORS:
      return { ...state, errrors: action.payload };

    default:
      return state;
  }
};
