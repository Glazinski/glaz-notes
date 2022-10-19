import React from 'react';
import PropTypes from 'prop-types';
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
  const { open, msg, handleClose, handleClick, info } = props;

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    handleClose();
  };

  const handleUndoClick = () => {
    handleClick();
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
        action={
          <>
            {!info ? (
              <Button
                style={{ margin: '0 10px 0 40px' }}
                color="secondary"
                size="small"
                onClick={handleUndoClick}
              >
                UNDO
              </Button>
            ) : null}
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </Snackbar>
  );
};

CustomSnackbar.defaultProps = {
  msg: null,
  info: null,
};

CustomSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  msg: PropTypes.string,
  info: PropTypes.bool,
};

export default CustomSnackbar;
