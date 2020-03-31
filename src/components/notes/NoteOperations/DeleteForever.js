import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteForever } from '../../../store/actions/notesActions';
import Confirm from '../../Confirm';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// MUI icons
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
  iconBtn: {
    padding: '7px',
    marginRight: '5px',
    color: theme.palette.text.primary,
  },
}));

const DeleteForever = ({ noteId, deleteForever, handleHoverClose }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event) => {
    setOpen(true);
    handleHoverClose(event);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    handleClose();
    deleteForever(noteId);
  };

  return (
    <>
      <Tooltip title="Delete forever" aria-label="Delete forever">
        <IconButton onClick={handleClickOpen} className={classes.iconBtn}>
          <DeleteForeverIcon fontSize="small" color="inherit" />
        </IconButton>
      </Tooltip>
      <Confirm open={open} handleClose={handleClose} handleDelete={handleDelete} />
    </>
  );
};

DeleteForever.propTypes = {
  noteId: PropTypes.string.isRequired,
  deleteForever: PropTypes.func.isRequired,
};

export default connect(null, { deleteForever })(DeleteForever);
