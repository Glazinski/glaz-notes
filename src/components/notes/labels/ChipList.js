import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

// Redux
import { connect } from 'react-redux';

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
  const { labels, labelsList, handleLabels } = props;
  const [chipData, setChipData] = useState(labels);

  const handleDelete = (chipToDelete) => () => {
    const chipArr = chipData.filter((chip) => chip !== chipToDelete);
    setChipData(chipArr);
    handleLabels(chipArr, chipToDelete, 'del');
  };

  useEffect(() => setChipData(labels), [labels]);

  const chips = _.values(labelsList).length > 0 ? chipData.map((item) => (
    <Chip
      key={item}
      className={classes.chip}
      variant="outlined"
      label={labelsList[item].labelName}
      onDelete={handleDelete(item)}
      size="small"
    />
  )) : null;

  return (
    <div
      className={classes.root}
    >
      {chips}
    </div>
  );
};

ChipList.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleLabels: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  labelsList: state.labels,
});

ChipList.defaultProps = {
  labels: [],
};

ChipList.propTypes = {
  labelsList: PropTypes.oneOfType([PropTypes.object]).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string),
};

export default connect(mapStateToProps)(ChipList);
