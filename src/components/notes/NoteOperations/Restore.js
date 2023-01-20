import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';

import { useStyles } from './Restore.styles';

const RestoreNote = (props) => {
  const classes = useStyles();
  const { handleNoteMove } = props;
  const msg = 'Note restored';

  const onRestoreClick = () => {
    handleNoteMove('notes', msg);
  };

  return (
    <Tooltip title="Restore" aria-label="Restore">
      <IconButton onClick={onRestoreClick} className={classes.iconBtn}>
        <RestoreFromTrashIcon fontSize="small" color="inherit" />
      </IconButton>
    </Tooltip>
  );
};

RestoreNote.propTypes = {
  handleNoteMove: PropTypes.func.isRequired,
};

export default RestoreNote;
