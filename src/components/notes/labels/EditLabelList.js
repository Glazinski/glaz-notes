import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CheckIcon from '@material-ui/icons/Check';
import LabelIcon from '@material-ui/icons/Label';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { editLabelName, removeLabel } from '../../../store/labels/actions';
import Confirm from '../../Confirm';

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

const EditLabelList = () => {
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.labels.labels);
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isHoveredIndex, setIsHoveredIndex] = useState(null);
  const [labelNames, setLabelNames] = useState(
    _.mapValues(labels, 'labelName')
  );
  const [open, setOpen] = useState(false);
  const inputs = [];
  const { labelId: labelIdParam } = useParams();

  useEffect(() => {
    setLabelNames(_.mapValues(labels, 'labelName'));
  }, [labels]);

  const handleFocusOn = (index) => {
    setIsHoveredIndex(index);
    setSelectedIndex(index);
    inputs[index].focus();
    inputs[index].select();
  };

  const handleFocusOut = (index) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
    }
  };

  const handleHover = (index) => {
    setIsHoveredIndex(index);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLabelNames({ ...labelNames, [name]: value });
  };

  const handleSubmit = (index, labelId) => {
    handleFocusOut(index);
    dispatch(editLabelName(labelId, labelNames[labelId]));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLabelDelete = (labelId) => {
    if (labelIdParam === labelId) {
      dispatch(removeLabel(labelId, true));
    } else {
      dispatch(removeLabel(labelId));
    }

    handleClose();
  };

  const confMsg =
    'We’ll delete this label and remove it from all of your Keep notes. Your notes won’t be deleted.';

  return _.values(labels).map((label, index) => (
    <ClickAwayListener
      key={label.labelId}
      onClickAway={() => handleFocusOut(index)}
    >
      <div
        key={label.labelId}
        className={classes.content}
        onMouseEnter={() => handleHover(index)}
        onMouseLeave={() => handleHover(null)}
      >
        {isHoveredIndex === index || selectedIndex === index ? (
          <Tooltip title="Delete label" aria-label="Delete label">
            <IconButton onClick={handleClickOpen} className={classes.iconBtn}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Cancel" aria-label="Cancel">
            <IconButton
              onClick={() => {
                handleClickOpen();
                handleFocusOn(index);
              }}
              className={classes.iconBtn}
            >
              <LabelIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        <Confirm
          open={open}
          handleClose={handleClose}
          handleDelete={() => handleLabelDelete(label.labelId)}
          msg={confMsg}
        />

        <div>
          <TextField
            name={label.labelId}
            onChange={handleChange}
            onClick={() => handleFocusOn(index)}
            value={labelNames[label.labelId] || ''}
            inputRef={(ref) => {
              inputs[index] = ref;
            }}
            placeholder="Create new label"
            InputProps={{
              disableUnderline: selectedIndex !== index,
              classes: { input: classes.textFieldLabel },
            }}
          />
        </div>

        {selectedIndex === index ? (
          <Tooltip title="Rename label" aria-label="Rename label">
            <IconButton
              onClick={() => handleSubmit(index, label.labelId)}
              className={classes.iconBtn}
            >
              <CheckIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Rename label" aria-label="Rename label">
            <IconButton
              onClick={() => handleFocusOn(index)}
              className={classes.iconBtn}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </ClickAwayListener>
  ));
};

export default EditLabelList;
