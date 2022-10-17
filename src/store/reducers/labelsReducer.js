import _ from 'lodash';
import {
  FETCH_LABELS,
  CREATE_LABEL,
  EDIT_LABEL_NAME,
  ADD_NOTE_TO_LABEL,
  OPEN_EDIT_LABELS,
  CLOSE_EDIT_LABELS,
  DELETE_LABEL,
} from '../types';

const initState = {
  isEditLabelsOpen: false,
  labels: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_LABELS:
      // console.log(action);
      return { ...state, labels: { ...action.payload } };

    case CREATE_LABEL:
      // console.log(state, action);
      return {
        ...state,
        labels: {
          ...state.labels,
          [action.payload.labelId]: action.payload,
        },
      };

    case EDIT_LABEL_NAME:
      return {
        ...state,
        labels: {
          ...state.labels,
          [action.payload.labelId]: {
            ...state.labels[action.payload.labelId],
            labelName: action.payload.newLabelName,
          },
        },
      };

    case ADD_NOTE_TO_LABEL: {
      const { labelId, newNoteIds } = action.payload;
      return {
        ...state,
        labels: {
          ...state.labels,
          [labelId]: {
            ...state.labels[labelId],
            noteIds: newNoteIds,
          },
        },
      };
    }

    case DELETE_LABEL: {
      const { labelId } = action.payload;

      return {
        ...state,
        labels: _.omit(state.labels, labelId),
      };
    }

    case OPEN_EDIT_LABELS:
      return { ...state, isEditLabelsOpen: true };

    case CLOSE_EDIT_LABELS:
      return { ...state, isEditLabelsOpen: false };

    default:
      return { ...state };
  }
};
