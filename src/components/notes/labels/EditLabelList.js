import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { editLabelName } from '../../../store/actions/labelsActions';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

// MUI icons
import CheckIcon from '@material-ui/icons/Check';
import LabelIcon from '@material-ui/icons/Label';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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

const EditLabelList = (props) => {
  const classes = useStyles();
  const { labels, editLabelName } = props;
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isHoveredIndex, setIsHoveredIndex] = useState(null);
  const [labelNames, setLabelNames] = useState(_.mapValues(labels, 'labelName'));
  const inputs = [];

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
    editLabelName(labelId, labelNames[labelId]);
  };

  return _.values(labels).map((label, index) => (
    <ClickAwayListener key={label.labelId} onClickAway={() => handleFocusOut(index)}>
      <div
        key={label.labelId}
        className={classes.content}
        onMouseEnter={() => handleHover(index)}
        onMouseLeave={() => handleHover(null)}
      >
        {isHoveredIndex === index || selectedIndex === index ? (
          <Tooltip title="Delete label" aria-label="Delete label">
            <IconButton className={classes.iconBtn}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Cancel" aria-label="Cancel">
            <IconButton className={classes.iconBtn}>
              <LabelIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        <div>
          <TextField
            name={label.labelId}
            onChange={handleChange}
            onClick={() => handleFocusOn(index)}
            value={labelNames[label.labelId] || ''}
            inputRef={(ref) => inputs[index] = ref}
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
            <IconButton onClick={() => handleFocusOn(index)} className={classes.iconBtn}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </ClickAwayListener>
  ));
};

const mapStateToProps = (state) => ({
  labels: state.labels,
});

EditLabelList.propTypes = {
  editLabelName: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { editLabelName })(EditLabelList);
