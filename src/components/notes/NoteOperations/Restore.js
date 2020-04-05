import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { moveNoteFromTo } from '../../../store/actions/notesActions';

import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';

const useStyles = makeStyles((theme) => ({
  iconBtn: {
    padding: '7px',
    marginRight: '5px',
    color: theme.palette.text.primary,
  },
}));

const RestoreNote = (props) => {
  const classes = useStyles();
  const { noteId, moveNoteFromTo } = props;
  const msg = 'Note restored';

  const onRestore = () => {
    moveNoteFromTo(noteId, 'bin', 'notes', msg);
  };

  return (
    <Tooltip title="Restore" aria-label="Restore">
      <IconButton onClick={onRestore} className={classes.iconBtn}>
        <RestoreFromTrashIcon fontSize="small" color="inherit" />
      </IconButton>
    </Tooltip>
  );
};

RestoreNote.propTypes = {
  noteId: PropTypes.string.isRequired,
  moveNoteFromTo: PropTypes.func.isRequired,
};

export default connect(null, { moveNoteFromTo })(RestoreNote);
