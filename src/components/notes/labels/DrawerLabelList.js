import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { fetchLabels } from '../../../store/actions/labelsActions';

// MUI
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';

const LabelList = (props) => {
  const {
    labels, itemClassName, handleItemClick, selectedIndex, fetchLabels,
  } = props;

  useEffect(() => {
    fetchLabels();
  }, []);

  const items = _.values(labels).map((item) => (
    <ListItem
      key={item.labelId + 1}
      className={itemClassName}
      button
      component={Link}
      to={`/${item.labelName}`}
      selected={selectedIndex === `/${item.labelName}`}
      onClick={() => handleItemClick(`/${item.labelName}`)}
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
  labels: state.labels,
});

LabelList.propTypes = {
  labels: PropTypes.oneOfType([PropTypes.object]).isRequired,
  itemClassName: PropTypes.string.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  selectedIndex: PropTypes.string.isRequired,
  fetchLabels: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { fetchLabels })(LabelList);
