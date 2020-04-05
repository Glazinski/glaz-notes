import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { noteMovedClear, moveNoteFromTo } from '../store/actions/notesActions';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: '15px 20px',
  },
}));

const CustomSnackbar = (props) => {
  const classes = useStyles();
  const {
    open,
    msg,
    noteMovedClear,
    moveNoteFromTo,
    from,
    to,
    noteId,
  } = props;

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    noteMovedClear();
  };

  const handleUndoClick = () => {
    moveNoteFromTo(noteId, to, from);
    handleSnackClose();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleSnackClose}
    >
      <SnackbarContent
        className={classes.root}
        message={msg}
        action={(
          <>
            <Button
              style={{ margin: '0 10px 0 40px' }}
              color="secondary"
              size="small"
              onClick={handleUndoClick}
            >
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        )}
      />
    </Snackbar>
  );
};

CustomSnackbar.defaultProps = {
  msg: null,
  from: null,
  to: null,
  noteId: null,
};

CustomSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  noteMovedClear: PropTypes.func.isRequired,
  moveNoteFromTo: PropTypes.func.isRequired,
  msg: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string,
  noteId: PropTypes.string,
};

export default connect(null, { noteMovedClear, moveNoteFromTo })(CustomSnackbar);
