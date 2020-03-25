import React from 'react';
import { connect } from 'react-redux';
import { deleteForever } from '../../../store/actions/notesActions';

import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
  iconBtn: {
    padding: '7px',
    marginRight: '5px',
    color: theme.palette.text.primary,
  },
}));

const DeleteForever = ({ noteId, deleteForever }) => {
  const classes = useStyles();

  return (
    <Tooltip title="Delete forever" aria-label="Delete forever">
      <IconButton onClick={() => deleteForever(noteId)} className={classes.iconBtn}>
        <DeleteForeverIcon fontSize="small" color="inherit" />
      </IconButton>
    </Tooltip>
  );
};

export default connect(null, { deleteForever })(DeleteForever);
