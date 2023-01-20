import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Confirm from '../../Confirm';
import { deleteNoteForever } from '../../../store/notes/actions';

import { useStyles } from './DeleteForever.styles';

const DeleteForever = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { noteId } = props;
  const [open, setOpen] = useState(false);
  const msg = 'Delete note forever?';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    handleClose();
    dispatch(deleteNoteForever(noteId));
  };

  return (
    <>
      <Tooltip title="Delete forever" aria-label="Delete forever">
        <IconButton onClick={handleClickOpen} className={classes.iconBtn}>
          <DeleteForeverIcon fontSize="small" color="inherit" />
        </IconButton>
      </Tooltip>
      <Confirm
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        msg={msg}
      />
    </>
  );
};

DeleteForever.propTypes = {
  noteId: PropTypes.string.isRequired,
};

export default DeleteForever;
