import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const CustomSnackbar = (props) => ReactDOM.createPortal(
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={props.open}
    autoHideDuration={6000}
    onClose={props.handleClose}
    message="Note archived"
    action={(
      <>
        <Button color="secondary" size="small" onClick={props.handleClose}>
          UNDO
        </Button>
        <IconButton size="small" aria-label="close" color="inherit" onClick={props.handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </>
    )}
  />,
  document.getElementById('snackbar-root'),
);

export default CustomSnackbar;
