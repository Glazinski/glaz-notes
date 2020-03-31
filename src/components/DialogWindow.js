import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles((theme) => ({
  container: {
    width: 500,
    heihgt: 200,
    padding: '10px',
  },
  dialog: {
    marginBottom: '200px',
  },
}));

const DialogWindow = (props) => {
  const {
    open, handleClose, children,
  } = props;
  const classes = useStyles();

  return (
    <Dialog
      className={classes.dialog}
      open={open}
      onClose={handleClose}
    >
      {children}
    </Dialog>
  );
};

DialogWindow.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default DialogWindow;
