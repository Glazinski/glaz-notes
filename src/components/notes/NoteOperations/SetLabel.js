import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SetLabelList from '../labels/SetLabelList';

// Redux
import { connect } from 'react-redux';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// MUI icons
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  list: {
    position: 'absolute',
    // bottom: '100%',
    top: '100%',
    right: 0,
    width: 225,
    minHeight: 50,
    zIndex: 99999,
    // padding: theme.spacing(1),
  },
  iconBtn: {
    padding: '7px',
    color: theme.palette.text.primary,
  },
}));

const SetLabel = (props) => {
  const classes = useStyles();
  const { labels, labelsList, handleLabels } = props;

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
    <div
      className={classes.root}
      // onMouseEnter={handleHoverOn}
      // onMouseLeave={handleHoverOut}
      // onClick={handleClick}
    >
      <Tooltip title={title} aria-label={title}>
        <IconButton onClick={handleClick} className={classes.iconBtn}>
          <LabelOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      {/* <button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        Open Popover
      </button> */}
      {open ? (
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
          {/* <SetLabelList handleLabels={handleLabels} labelsList={_.values(labelsList)} /> */}
        </Popover>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  labelsList: state.labels,
});

SetLabel.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  labelsList: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleLabels: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(SetLabel);
