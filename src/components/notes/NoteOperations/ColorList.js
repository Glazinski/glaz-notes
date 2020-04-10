import React, { useState } from 'react';
import _ from 'lodash';

// Redux
import { connect } from 'react-redux';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

// MUI icons
import CheckIcon from '@material-ui/icons/Check';

const listWidth = 100;

const useStyles = makeStyles((theme) => ({
  root: {
    width: 150,
    height: listWidth,
    position: 'absolute',
    top: -listWidth,
    left: 0,
    zIndex: 1400,
    padding: '5px',
    backgroundColor: theme.palette.background.default,
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridRowGap: '5px',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25px',
    height: '25px',
    borderRadius: '100px',
    border: 'none',
    margin: 'auto',
    '&:hover': {
      border: `2px solid ${theme.palette.text.primary}`,
      cursor: 'pointer',
    },
    outline: 'none',
    '&:first-child': {
      border: `1px solid ${theme.palette.text.primary}`,
    },
  },
  icon: {
    color: theme.palette.text.primary,
  },
}));

const ColorList = (props) => {
  const classes = useStyles();
  const { colorId, colors, handleColorChange } = props;
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
        {checkedIndex === item.name ? (
          <CheckIcon className={classes.icon} fontSize="small" />
        ) : false}
      </button>
    </Tooltip>
  ));

  return (
    <Paper className={classes.root}>
      <div className={classes.content}>
        {items}
      </div>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  colors: _.mapKeys(state.ui.colors, 'name'),
});

export default connect(mapStateToProps)(ColorList);
