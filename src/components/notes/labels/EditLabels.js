import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';

import EditLabelList from './EditLabelList';
import DialogWindow from '../../DialogWindow';
import {
  createLabel,
  closeEditLabels,
} from '../../../store/actions/labelsActions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    padding: theme.spacing(2),
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '10px 0',
  },
  iconBtn: {
    padding: 5,
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '10px 0 0 0',
  },
}));

const EditLabels = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = useSelector((state) => state.labels.isEditLabelsOpen);
  const [isFocused, setIsFocused] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const textFieldEl = useRef(null);

  const handleFocusOn = () => {
    setIsFocused(false);
    setIsFocused(true);
    textFieldEl.current.focus();
  };

  const handleFocusOut = () => {
    setIsFocused(false);
    setNewLabel('');
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setNewLabel(value);
  };

  const handleSubmit = () => {
    if (newLabel.trim().length > 0) {
      dispatch(createLabel(newLabel));
      setNewLabel('');
    }
  };

  const handleClose = () => dispatch(closeEditLabels());

  return (
    <DialogWindow open={open} handleClose={handleClose}>
      <div className={classes.root}>
        <Typography>Edit labels</Typography>

        <form>
          <ClickAwayListener onClickAway={handleFocusOut}>
            <div className={classes.content}>
              {isFocused ? (
                <Tooltip title="Cancel" aria-label="Cancel">
                  <IconButton
                    onClick={handleFocusOut}
                    className={classes.iconBtn}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Create lable" aria-label="Create lable">
                  <IconButton
                    onClick={handleFocusOn}
                    className={classes.iconBtn}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
              <div>
                <TextField
                  onChange={handleChange}
                  onClick={handleFocusOn}
                  value={newLabel}
                  inputRef={textFieldEl}
                  placeholder="Create new label"
                  InputProps={{
                    disableUnderline: !isFocused,
                    classes: { input: classes.textFieldLabel },
                  }}
                />
              </div>
              <Tooltip
                style={
                  isFocused
                    ? { visibility: 'visible' }
                    : { visibility: 'hidden' }
                }
                title="Create label"
                aria-label="Create label"
              >
                <IconButton onClick={handleSubmit} className={classes.iconBtn}>
                  <CheckIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          </ClickAwayListener>

          <EditLabelList />
        </form>
        <Divider />
        <div className={classes.footer}>
          <Button onClick={handleClose}>DONE</Button>
        </div>
      </div>
    </DialogWindow>
  );
};

export default EditLabels;
