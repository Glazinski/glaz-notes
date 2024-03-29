import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';

import { useStyles } from './ArchiveNote.styles';

const ArchiveNote = (props) => {
  const classes = useStyles();
  const { handleNoteMove } = props;
  const msg = 'Note archived';

  const onArchiveClick = () => {
    handleNoteMove('archive', msg);
  };

  return (
    <>
      <Tooltip title="Archive" aria-label="Archive">
        <IconButton onClick={onArchiveClick} className={classes.iconBtn}>
          <ArchiveOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  );
};

ArchiveNote.defaultProps = {
  handleNoteMove: null,
};

ArchiveNote.propTypes = {
  handleNoteMove: PropTypes.func,
};

export default ArchiveNote;
