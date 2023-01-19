import _ from 'lodash';

export const deleteLabel = (state, action) => ({
  ...state,
  labels: _.omit(state.labels, action.payload),
});
