import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles((theme) => ({
  dialog: {
    marginBottom: '200px',
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: '0',
  },
}));

const DialogWindow = (props) => {
  const {
    open, handleClose, children, isFullScreen,
  } = props;
  const classes = useStyles();

  return (
    <Dialog
      className={isFullScreen ? null : classes.dialog}
      open={open}
      onClose={handleClose}
      fullScreen={isFullScreen}
      // fullScreen
    >
      {children}
    </Dialog>
  );
};

DialogWindow.defaultProps = {
  isFullScreen: false,
};

DialogWindow.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  isFullScreen: PropTypes.bool,
};

export default DialogWindow;
