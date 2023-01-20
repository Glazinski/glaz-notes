import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';

import { useStyles } from './DialogWindow.styles';

const DialogWindow = (props) => {
  const { open, handleClose, children, isFullScreen } = props;
  const classes = useStyles();

  return (
    <Dialog
      className={isFullScreen ? null : classes.dialog}
      open={open}
      onClose={handleClose}
      fullScreen={isFullScreen}
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
