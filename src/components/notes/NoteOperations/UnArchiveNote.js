import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';

import { useStyles } from './UnArchiveNote.styles';

const UnArchiveNote = (props) => {
  const classes = useStyles();
  const { handleNoteMove } = props;
  const msg = 'Note unarchived';

  const onUnArchiveClick = () => {
    handleNoteMove('notes', msg);
  };

  return (
    <Tooltip title="Unarchive" aria-label="Unarchive">
      <IconButton onClick={onUnArchiveClick} className={classes.iconBtn}>
        <UnarchiveOutlinedIcon fontSize="small" color="inherit" />
      </IconButton>
    </Tooltip>
  );
};

UnArchiveNote.propTypes = {
  handleNoteMove: PropTypes.func.isRequired,
};

export default UnArchiveNote;
