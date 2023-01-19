import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import CheckIcon from '@material-ui/icons/Check';

import { useStyles } from './ColorList.styles';

const ColorList = (props) => {
  const classes = useStyles();
  const colors = useSelector((state) => state.ui.colors);
  const { colorId, handleColorChange } = props;
  const [checkedIndex, setCheckedIndex] = useState(colorId);

  const handleChecked = (colorName) => {
    handleColorChange(colorName);
    setCheckedIndex(colorName);
  };

  const items = _.values(colors).map((item) => (
    <Tooltip key={item.color} title={item.name}>
      <button
        onClick={() => handleChecked(item.name)}
        type="button"
        className={classes.item}
        style={{ backgroundColor: item.color }}
      >
        {checkedIndex === item.name && (
          <CheckIcon className={classes.icon} fontSize="small" />
        )}
      </button>
    </Tooltip>
  ));

  return (
    <Paper className={classes.root}>
      <div className={classes.content}>{items}</div>
    </Paper>
  );
};

ColorList.defaultProps = {
  colorId: null,
};

ColorList.propTypes = {
  colorId: PropTypes.string,
  handleColorChange: PropTypes.func.isRequired,
};

export default ColorList;
