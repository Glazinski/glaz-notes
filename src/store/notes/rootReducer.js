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
} from './types';
import { notesFetched } from './reducers/notesFetched';
import { fetchNote } from './reducers/fetchNote';
import { notesLoading } from './reducers/notesLoading';
import { createNote } from './reducers/createNote';
import { deleteNoteForever } from './reducers/deleteNoteForever';
import { deleteNoteFromState } from './reducers/deleteNoteFromState';
import { updateNote } from './reducers/updateNote';
import { moveNote } from './reducers/moveNote';
import { moveNoteBack } from './reducers/moveNoteBack';
import { moveNoteClear } from './reducers/moveNoteClear';
import { changeNoteColor } from './reducers/changeNoteColor';
import { deleteNotesForever } from './reducers/deleteNotesForever';
import { starNote } from './reducers/starNote';
import { changeNoteLabels } from './reducers/changeNoteLabels';
import { setFilteredNotes } from './reducers/setFilteredNotes';
import { deleteNoteImage } from './reducers/deleteNoteImage';
import { setNotes } from './reducers/setNotes';
import { loadingNoteImage } from './reducers/loadingNoteImage';
import { loadingNoteImageFinish } from './reducers/loadingNoteImageFinish';
import { setNote } from './reducers/setNote';
import { setNoteErrors } from './reducers/setNoteErrors';

const initState = {
  notes: {},
  errors: null,
  loading: false,
  noteMoved: {
    open: false,
  },
  filteredNotes: {},
  loadingNoteImage: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case NOTES_FETCHED:
      return notesFetched(state, action);

    case FETCH_NOTE:
      return fetchNote(state, action);

    case NOTES_LOADING:
      return notesLoading(state);

    case CREATE_NOTE:
      return createNote(state, action);

    case DELETE_NOTE_FOREVER:
      return deleteNoteForever(state, action);

    case DELETE_NOTE_FROM_STATE:
      return deleteNoteFromState(state, action);

    case UPDATE_NOTE:
      return updateNote(state, action);

    case MOVE_NOTE:
      return moveNote(state, action);

    case MOVE_NOTE_BACK:
      return moveNoteBack(state, action);

    case MOVE_NOTE_CLEAR:
      return moveNoteClear(state);

    case CHANGE_NOTE_COLOR:
      return changeNoteColor(state, action);

    case DELETE_NOTES_FOREVER:
      return deleteNotesForever(state);

    case STAR_NOTE:
      return starNote(state, action);

    case CHANGE_NOTE_LABELS:
      return changeNoteLabels(state, action);

    case SET_FILTERED_NOTES:
      return setFilteredNotes(state, action);

    case DELETE_NOTE_IMAGE:
      return deleteNoteImage(state, action);

    case SET_NOTES:
      return setNotes(state, action);

    case LOADING_NOTE_IMAGE:
      return loadingNoteImage(state, action);

    case LOADING_NOTE_IMAGE_FINISH:
      return loadingNoteImageFinish(state, action);

    case SET_NOTE:
      return setNote(state);

    case SET_NOTE_ERRORS:
      return setNoteErrors(state, action);

    default:
      return state;
  }
};
