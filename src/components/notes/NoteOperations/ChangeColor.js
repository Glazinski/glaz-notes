import React, { useState } from 'react';
import ColorList from './ColorList';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// MUI icons
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  iconBtn: {
    padding: '7px',
    color: theme.palette.text.primary,
  },
  test: {
    position: 'absolute',
    top: '-15px',
    left: 0,
  },
}));

const ChangeColor = (props) => {
  const classes = useStyles();
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverOn = () => {
    setIsHovered(true);
  };

  const handleHoverOut = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={classes.root}
      onMouseEnter={handleHoverOn}
      onMouseLeave={handleHoverOut}
    >
      <Tooltip title="Change color" aria-label="Change color">
        <IconButton
          className={classes.iconBtn}
          aria-haspopup="true"

        >
          <PaletteOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      {isHovered ? <ColorList /> : null}
    </div>
  );
};

export default ChangeColor;
