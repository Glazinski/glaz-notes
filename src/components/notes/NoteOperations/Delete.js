import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { moveNoteToBin } from '../../../store/actions/notesActions';

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
  const { noteId, moveNoteToBin } = props;

  const onDeleteClick = () => {
    moveNoteToBin(noteId);
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
  moveNoteToBin: PropTypes.func.isRequired,
};

export default connect(null, { moveNoteToBin })(DeleteNote);
