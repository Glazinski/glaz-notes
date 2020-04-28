import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

// MUI
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';

const LabelList = (props) => {
  const {
    labels, itemClassName, handleItemClick, selectedIndex,
  } = props;

  const items = _.values(labels).map((item) => (
    <ListItem
      key={item.labelId + 1}
      className={itemClassName}
      button
      component={Link}
      to={`/label/${item.labelId}`}
      selected={selectedIndex === `/label/${item.labelId}`}
      onClick={() => handleItemClick(`/label/${item.labelId}`)}
    >
      <ListItemIcon><LabelOutlinedIcon /></ListItemIcon>
      <ListItemText primary={item.labelName} />
    </ListItem>
  ));

  return (
    <>
      {items}
    </>
  );
};

const mapStateToProps = (state) => ({
  labels: state.labels.labels,
});

LabelList.propTypes = {
  labels: PropTypes.oneOfType([PropTypes.object]).isRequired,
  itemClassName: PropTypes.string.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  selectedIndex: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(LabelList);
