import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// MUI icons
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

const useStyles = makeStyles((theme) => ({
  iconBtn: {
    padding: '7px',
    color: theme.palette.text.primary,
  },
}));

const DeleteNote = (props) => {
  const classes = useStyles();
  const {
    handleNoteMove,
  } = props;
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
