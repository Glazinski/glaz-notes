import { SET_FILTERED_NOTES } from '../types';

export const setFilteredNotes = (filteredNotes) => ({
  type: SET_FILTERED_NOTES,
  payload: {
    filteredNotes,
  },
});
