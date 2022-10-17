import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';

const LabelList = (props) => {
  const { itemClassName, handleItemClick, selectedIndex } = props;
  const labels = useSelector((state) => state.labels.labels);

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
      <ListItemIcon>
        <LabelOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary={item.labelName} />
    </ListItem>
  ));

  return <>{items}</>;
};

LabelList.propTypes = {
  itemClassName: PropTypes.string.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  selectedIndex: PropTypes.string.isRequired,
};

export default LabelList;
