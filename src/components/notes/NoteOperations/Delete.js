import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import { useStyles } from './Delete.styles';

const DeleteNote = (props) => {
  const classes = useStyles();
  const { handleNoteMove } = props;
  const msg = 'Note binned';

  const onDeleteClick = () => {
    handleNoteMove('bin', msg);
  };

  return (
    <>
      <Tooltip title="Delete" aria-label="Delete">
        <IconButton onClick={onDeleteClick} className={classes.iconBtn}>
          <DeleteOutlineOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  );
};

DeleteNote.defaultProps = {
  handleNoteMove: null,
};

DeleteNote.propTypes = {
  handleNoteMove: PropTypes.func,
};

export default DeleteNote;
