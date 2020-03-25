import React from 'react';
import { connect } from 'react-redux';
import { restore } from '../../../store/actions/notesActions';

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

const DeleteForever = ({ noteId, restore }) => {
  const classes = useStyles();

  return (
    <Tooltip title="Restore" aria-label="Restore">
      <IconButton onClick={() => restore(noteId)} className={classes.iconBtn}>
        <RestoreFromTrashIcon fontSize="small" color="inherit" />
      </IconButton>
    </Tooltip>
  );
};

export default connect(null, { restore })(DeleteForever);
