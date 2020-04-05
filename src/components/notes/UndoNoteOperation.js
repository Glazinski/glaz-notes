import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomSnackbar from '../CustomSnackbar';

const UndoNoteOperation = ({ noteMoved }) => (
  <CustomSnackbar {...noteMoved} />
);

const mapStateToProps = (state) => ({
  noteMoved: state.notes.noteMoved,
});

UndoNoteOperation.propTypes = {
  noteMoved: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default connect(mapStateToProps)(UndoNoteOperation);
