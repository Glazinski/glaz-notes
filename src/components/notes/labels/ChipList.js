import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Chip from '@material-ui/core/Chip';

import { useStyles } from './ChipList.styles';

const ChipList = (props) => {
  const classes = useStyles();
  const { labels, handleLabels } = props;
  const labelsList = useSelector((state) => state.labels.labels);
  const [chipData, setChipData] = useState(labels);

  const handleDelete = (chipToDelete) => () => {
    const chipArr = chipData.filter((chip) => chip !== chipToDelete);
    setChipData(chipArr);
    handleLabels(chipArr, chipToDelete, 'del');
  };

  useEffect(() => setChipData(labels), [labels]);

  const chips =
    _.values(labelsList).length > 0 &&
    chipData.map((item) => (
      <Chip
        key={item}
        className={classes.chip}
        variant="outlined"
        label={labelsList[item].labelName}
        onDelete={handleDelete(item)}
        size="small"
      />
    ));

  return <div className={classes.root}>{chips}</div>;
};

ChipList.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleLabels: PropTypes.func.isRequired,
};

ChipList.defaultProps = {
  labels: [],
};

ChipList.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string),
};

export default ChipList;
