import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import DialogWindow from './DialogWindow';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 430,
    [theme.breakpoints.down('sm')]: {
      width: '80vw',
    },
  },
  title: {
    fontSize: '1rem',
  },
}));

const Confirm = (props) => {
  const classes = useStyles();
  const { open, handleClose, handleDelete, msg } = props;

  return (
    <DialogWindow open={open} handleClose={handleClose}>
      <div className={classes.container}>
        <DialogTitle>
          <Typography variant="body1">{msg}</Typography>
        </DialogTitle>
        <DialogActions style={{ marginRight: '15px' }}>
          <Button
            onClick={handleClose}
            style={{
              marginRight: '20px',
            }}
          >
            Cancel
          </Button>
          <Button color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </div>
    </DialogWindow>
  );
};

Confirm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  msg: PropTypes.string.isRequired,
};

export default Confirm;
