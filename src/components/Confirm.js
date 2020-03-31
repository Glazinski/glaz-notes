import React from 'react';
import PropTypes from 'prop-types';
import DialogWindow from './DialogWindow';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  container: {
    width: 430,
  },
}));

const Confirm = (props) => {
  const classes = useStyles();
  const { open, handleClose, handleDelete } = props;

  return (
    <DialogWindow open={open} handleClose={handleClose}>
      <div className={classes.container}>
        <DialogTitle>Delete note forever?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </div>
    </DialogWindow>
  );
};

Confirm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Confirm;
