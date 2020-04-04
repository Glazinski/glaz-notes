import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restoreNote } from '../../../store/actions/notesActions';

import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';

const useStyles = makeStyles((theme) => ({
  iconBtn: {
    padding: '7px',
    marginRight: '5px',
    color: theme.palette.text.primary,
  },
}));

const DeleteForever = (props) => {
  const classes = useStyles();
  const { noteId, restoreNote } = props;
  const onRestore = () => {
    restoreNote(noteId);
  };

  return (
    <Tooltip title="Restore" aria-label="Restore">
      <IconButton onClick={onRestore} className={classes.iconBtn}>
        <RestoreFromTrashIcon fontSize="small" color="inherit" />
      </IconButton>
    </Tooltip>
  );
};

DeleteForever.propTypes = {
  noteId: PropTypes.string.isRequired,
  restoreNote: PropTypes.func.isRequired,
};

export default connect(null, { restoreNote })(DeleteForever);
