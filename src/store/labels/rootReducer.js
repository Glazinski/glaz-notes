import {
  FETCH_LABELS,
  CREATE_LABEL,
  EDIT_LABEL_NAME,
  ADD_NOTE_TO_LABEL,
  OPEN_EDIT_LABELS,
  CLOSE_EDIT_LABELS,
  DELETE_LABEL,
} from './types';
import { fetchLabels } from './reducers/fetchLabels';
import { createLabel } from './reducers/createLabel';
import { editLabelName } from './reducers/editLabelName';
import { addNoteToLabel } from './reducers/addNoteToLabel';
import { deleteLabel } from './reducers/deleteLabel';
import { openEditLabels } from './reducers/openEditLabels';
import { closeEditLabels } from './reducers/closeEditLabels';

const initState = {
  isEditLabelsOpen: false,
  labels: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_LABELS:
      return fetchLabels(state, action);

    case CREATE_LABEL:
      return createLabel(state, action);

    case EDIT_LABEL_NAME:
      return editLabelName(state, action);

    case ADD_NOTE_TO_LABEL:
      return addNoteToLabel(state, action);

    case DELETE_LABEL:
      return deleteLabel(state, action);

    case OPEN_EDIT_LABELS:
      return openEditLabels(state);

    case CLOSE_EDIT_LABELS:
      return closeEditLabels(state);

    default:
      return { ...state };
  }
};
