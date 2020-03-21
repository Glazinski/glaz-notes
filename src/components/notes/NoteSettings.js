import React from 'react';
import PropTypes from 'prop-types';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// MUI icons
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    marginTop: '5px',
    transition: 'opacity .3s ease',
  },
  iconBtn: {
    padding: '7px',
  },
}));

const NoteSettings = (props) => {
  const { isHovered } = props;
  const classes = useStyles();

  return (
    <div className={classes.container} style={isHovered ? { opacity: '1' } : { opacity: '0' }}>
      <Tooltip title="Change color" aria-label="Change color">
        <IconButton className={classes.iconBtn}>
          <PaletteOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add image" aria-label="Add image">
        <IconButton className={classes.iconBtn}>
          <ImageOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Archive" aria-label="Archive">
        <IconButton className={classes.iconBtn}>
          <ArchiveOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete" aria-label="Delete">
        <IconButton className={classes.iconBtn}>
          <DeleteOutlineOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add Label" aria-label="Add Label">
        <IconButton className={classes.iconBtn}>
          <LabelOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

NoteSettings.propTypes = {
  isHovered: PropTypes.bool.isRequired,
};

export default NoteSettings;
