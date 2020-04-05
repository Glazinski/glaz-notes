import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { moveNoteFromTo } from '../../../store/actions/notesActions';

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
  const { noteId, moveNoteFromTo, coll } = props;
  const msg = 'Note binned';

  const onDeleteClick = () => {
    moveNoteFromTo(noteId, coll, 'bin', msg);
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

DeleteNote.propTypes = {
  noteId: PropTypes.string.isRequired,
  moveNoteFromTo: PropTypes.func.isRequired,
  coll: PropTypes.string.isRequired,
};

export default connect(null, { moveNoteFromTo })(DeleteNote);
