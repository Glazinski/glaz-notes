import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { moveNoteFromTo } from '../../../store/actions/notesActions';

import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';

const useStyles = makeStyles((theme) => ({
  iconBtn: {
    padding: '7px',
    marginRight: '5px',
    color: theme.palette.text.primary,
  },
}));

const UnArchiveNote = (props) => {
  const classes = useStyles();
  const { noteId, moveNoteFromTo, coll } = props;
  const msg = 'Note unarchived';

  const onRestore = () => {
    moveNoteFromTo(noteId, coll, 'notes', msg);
  };

  return (
    <Tooltip title="Unarchive" aria-label="Unarchive">
      <IconButton onClick={onRestore} className={classes.iconBtn}>
        <UnarchiveOutlinedIcon fontSize="small" color="inherit" />
      </IconButton>
    </Tooltip>
  );
};

UnArchiveNote.propTypes = {
  noteId: PropTypes.string.isRequired,
  moveNoteFromTo: PropTypes.func.isRequired,
  coll: PropTypes.string.isRequired,
};

export default connect(null, { moveNoteFromTo })(UnArchiveNote);
