import React from 'react';
import { connect } from 'react-redux';
import { moveToBin } from '../../../store/actions/notesActions';

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

const DeleteNote = ({ noteId, moveToBin }) => {
  const onDeleteClick = () => moveToBin(noteId);
  const classes = useStyles();

  return (
    <Tooltip title="Delete" aria-label="Delete">
      <IconButton onClick={onDeleteClick} className={classes.iconBtn}>
        <DeleteOutlineOutlinedIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default connect(null, { moveToBin })(DeleteNote);
