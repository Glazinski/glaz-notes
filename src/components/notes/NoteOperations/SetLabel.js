import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';

import SetLabelList from '../labels/SetLabelList';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  list: {
    position: 'absolute',
    top: '100%',
    right: 0,
    width: 225,
    minHeight: 50,
    zIndex: 99999,
  },
  iconBtn: {
    padding: '7px',
    color: theme.palette.text.primary,
  },
}));

const SetLabel = (props) => {
  const classes = useStyles();
  const { labels, handleLabels } = props;
  const labelsList = useSelector((state) => state.labels.labels);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const title = labels.length > 0 ? 'Change label' : 'Add label';

  return (
    <div className={classes.root}>
      <Tooltip title={title} aria-label={title}>
        <IconButton onClick={handleClick} className={classes.iconBtn}>
          <LabelOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      {open && (
        <Popover
          id={id}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <SetLabelList
            labels={labels}
            handleLabels={handleLabels}
            labelsList={labelsList}
          />
        </Popover>
      )}
    </div>
  );
};

SetLabel.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleLabels: PropTypes.func.isRequired,
};

export default SetLabel;
