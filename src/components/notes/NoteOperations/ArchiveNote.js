import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { moveNoteFromTo } from '../../../store/actions/notesActions';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// MUI icons
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';

const useStyles = makeStyles((theme) => ({
  iconBtn: {
    padding: '7px',
    color: theme.palette.text.primary,
  },
}));

const ArchiveNote = (props) => {
  const classes = useStyles();
  const {
    noteId, moveNoteFromTo, coll, formData,
  } = props;
  const msg = 'Note archived';

  const onArchiveClick = () => {
    moveNoteFromTo(noteId, coll, 'archive', msg, formData);
  };

  return (
    <>
      <Tooltip title="Archive" aria-label="Archive">
        <IconButton onClick={onArchiveClick} className={classes.iconBtn}>
          <ArchiveOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  );
};


ArchiveNote.defaultProps = {
  formData: null,
};

ArchiveNote.propTypes = {
  noteId: PropTypes.string.isRequired,
  moveNoteFromTo: PropTypes.func.isRequired,
  coll: PropTypes.string.isRequired,
  formData: PropTypes.oneOfType([PropTypes.object]),
};

export default connect(null, { moveNoteFromTo })(ArchiveNote);
