import React from 'react';
import PropTypes from 'prop-types';

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
    handleNoteMove,
  } = props;
  const msg = 'Note archived';

  const onArchiveClick = () => {
    handleNoteMove('archive', msg);
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
  handleNoteMove: null,
};

ArchiveNote.propTypes = {
  handleNoteMove: PropTypes.func,
};

export default ArchiveNote;
