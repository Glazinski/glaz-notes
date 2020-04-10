import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ColorList from './ColorList';

// Redux
import { connect } from 'react-redux';
import { changeNoteColor } from '../../../store/actions/notesActions';

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
  const { colorId, changeNoteColor, noteId } = props;
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverOn = () => {
    setIsHovered(true);
  };

  const handleHoverOut = () => {
    setIsHovered(false);
  };

  const handleColorChange = (colorName) => {
    changeNoteColor(noteId, colorName);
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
      {isHovered ? <ColorList colorId={colorId} handleColorChange={handleColorChange} /> : null}
    </div>
  );
};

ChangeColor.defaultProps = {
  colorId: 'Default',
};

ChangeColor.propTypes = {
  colorId: PropTypes.string,
  changeNoteColor: PropTypes.func.isRequired,
  noteId: PropTypes.string.isRequired,
};

export default connect(null, { changeNoteColor })(ChangeColor);
