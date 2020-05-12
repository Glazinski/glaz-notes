import _ from 'lodash';
import {
  SET_NOTE,
  SET_NOTE_ERRORS,
  MOVE_NOTE,
  MOVE_NOTE_BACK,
  MOVE_NOTE_CLEAR,
  NOTES_LOADING,
  NOTES_FETCHED,
  FETCH_NOTE,
  CREATE_NOTE,
  DELETE_NOTE_FOREVER,
  UPDATE_NOTE,
  CHANGE_NOTE_COLOR,
  DELETE_NOTES_FOREVER,
  STAR_NOTE,
  CHANGE_NOTE_LABELS,
  DELETE_NOTE_FROM_STATE,
  SET_FILTERED_NOTES,
  DELETE_NOTE_IMAGE,
  SET_NOTES,
  LOADING_NOTE_IMAGE,
  LOADING_NOTE_IMAGE_FINISH,
} from '../types';

const initState = {
  notes: {},
  errors: null,
  loading: false,
  noteMoved: {
    open: false,
  },
  loadingNoteImage: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case NOTES_FETCHED:
      return { ...state, notes: action.payload, loading: false };

    case FETCH_NOTE: {
      const { id } = action.payload;
      return {
        ...state,
        notes: {
          ...state.notes,
          [id]: { ...action.payload },
        },
      };
    }

    case NOTES_LOADING:
      return { ...state, loading: true };

    case CREATE_NOTE:
      return { ...state, notes: { [action.payload.id]: action.payload, ...state.notes } };

    case DELETE_NOTE_FOREVER:
      return { ...state, notes: _.omit(state.notes, action.payload) };

    case DELETE_NOTE_FROM_STATE:
      return { ...state, notes: _.omit(state.notes, action.payload.noteId) };

    case UPDATE_NOTE: {
      const { noteId, title, content } = action.payload;

      return {
        ...state,
        notes: {
          ...state.notes,
          [noteId]: {
            ...state.notes[noteId],
            title,
            content,
          },
        },
      };
    }

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

    case CHANGE_NOTE_COLOR: {
      const { noteId, color } = action.payload;

      return {
        ...state,
        notes: {
          ...state.notes,
          [noteId]: {
            ...state.notes[noteId],
            colorName: color,
          },
        },
      };
    }

    case DELETE_NOTES_FOREVER:
      return {
        ...state,
        notes: {},
      };

    case STAR_NOTE: {
      const { noteId, newIsStarred } = action.payload;

      return {
        ...state,
        notes: {
          ...state.notes,
          [noteId]: {
            ...state.notes[noteId],
            isStarred: newIsStarred,
          },
        },
      };
    }

    case CHANGE_NOTE_LABELS: {
      const { noteId, newLabels } = action.payload;

      return {
        ...state,
        notes: {
          ...state.notes,
          [noteId]: {
            ...state.notes[noteId],
            labels: [...newLabels],
          },
        },
      };
    }

    case SET_FILTERED_NOTES:
      return {
        ...state,
        notes: {
          ...action.payload.filteredNotes,
        },
      };

    case DELETE_NOTE_IMAGE: {
      const { noteId } = action.payload;
      return {
        ...state,
        notes: {
          ...state.notes,
          [noteId]: {
            ...state.notes[noteId],
            imageUrl: '',
          },
        },
      };
    }

    case SET_NOTES: {
      const { changedNotes } = action.payload;
      return {
        ...state,
        notes: {
          ...state.notes,
          ...changedNotes,
        },
      };
    }

    case LOADING_NOTE_IMAGE: {
      const { noteId } = action.payload;

      return {
        ...state,
        loadingNoteImage: [...state.loadingNoteImage, noteId],
        notes: {
          ...state.notes,
          [noteId]: {
            ...state.notes[noteId],
            imageUrl: '',
          },
        },
      };
    }

    case LOADING_NOTE_IMAGE_FINISH: {
      const { noteId } = action.payload;

      return {
        ...state,
        loadingNoteImage: _.without(state.loadingNoteImage, noteId),
      };
    }

    case SET_NOTE:
      return { ...state, errors: null, loading: false };

    case SET_NOTE_ERRORS:
      return { ...state, errrors: action.payload };

    default:
      return state;
  }
};
