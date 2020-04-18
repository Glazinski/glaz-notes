import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    zIndex: 1100,
  },
  chip: {
    marginLeft: 5,
  },
}));

const ChipList = (props) => {
  const classes = useStyles();
  const { labels, handleLabels } = props;
  const [chipData, setChipData] = useState(labels);

  const handleDelete = (chipToDelete) => () => {
    const chipArr = chipData.filter((chip) => chip !== chipToDelete);
    setChipData(chipArr);
    handleLabels(chipArr);
  };

  useEffect(() => setChipData(labels), [labels]);

  const chips = chipData.length > 0 ? chipData.map((item) => (
    <Chip
      key={item}
      className={classes.chip}
      variant="outlined"
      label={item}
      onDelete={handleDelete(item)}
      size="small"
    />
  )) : null;

  return (
    <div
      className={classes.root}
      style={{ marginTop: '10px' }}
    >
      {chips}
    </div>
  );
};

ChipList.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleLabels: PropTypes.func.isRequired,
};

export default ChipList;
