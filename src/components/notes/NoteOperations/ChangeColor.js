import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';

import ColorList from './ColorList';

import { useStyles } from './ChangeColor.styles';

const ChangeColor = (props) => {
  const classes = useStyles();
  const { colorId, handleColor } = props;
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverOn = () => {
    setIsHovered(true);
  };

  const handleHoverOut = () => {
    setIsHovered(false);
  };

  const handleColorChange = (colorName) => {
    handleColor(colorName);
  };

  return (
    <div
      className={classes.root}
      onMouseEnter={handleHoverOn}
      onMouseLeave={handleHoverOut}
    >
      <Tooltip title="Change color" aria-label="Change color">
        <IconButton className={classes.iconBtn} aria-haspopup="true">
          <PaletteOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      {isHovered && (
        <ColorList colorId={colorId} handleColorChange={handleColorChange} />
      )}
    </div>
  );
};

ChangeColor.defaultProps = {
  colorId: 'Default',
};

ChangeColor.propTypes = {
  colorId: PropTypes.string,
  handleColor: PropTypes.func.isRequired,
};

export default ChangeColor;
