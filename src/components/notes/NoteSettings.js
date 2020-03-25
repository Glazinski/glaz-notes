import React from 'react';
import PropTypes from 'prop-types';
import ChangeColor from './NoteOperations/ChangeColor';
import DeleteNote from './NoteOperations/Delete';
import DeleteForever from './NoteOperations/DeleteForever';
import Restore from './NoteOperations/Restore';
import { useLocation } from 'react-router-dom';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// MUI icons
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    marginTop: '5px',
    transition: 'opacity .3s ease',
  },
  binContainer: {
    display: 'flex',
    marginTop: '5px',
    marginLeft: '-6px',
    transition: 'opacity .2s ease',
  },
  iconBtn: {
    padding: '7px',
    color: theme.palette.text.primary,
  },
}));

const NoteSettings = (props) => {
  const { isHovered, noteId } = props;
  const classes = useStyles();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const renderItems = () => {
    if (location.pathname === '/bin') {
      return (
        <div
          className={classes.binContainer}
          style={isHovered ? { opacity: '1', pointerEvents: 'auto' } : { opacity: '0', pointerEvents: 'none' }}
        >
          <DeleteForever noteId={noteId} />
          <Restore noteId={noteId} />
        </div>
      );
    }

    return (
      <div
        className={classes.container}
        style={isHovered ? { opacity: '1', pointerEvents: 'auto' } : { opacity: '0', pointerEvents: 'none' }}
      >
        <Tooltip title="Change color" aria-label="Change color">
          <IconButton
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            className={classes.iconBtn}
          >
            <PaletteOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <ChangeColor open={open} anchorEl={anchorEl} onClose={handlePopoverClose} />

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
        <DeleteNote noteId={noteId} />
        {/* <Tooltip title="Delete" aria-label="Delete">
        <IconButton className={classes.iconBtn}>
          <DeleteOutlineOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip> */}
        <Tooltip title="Add Label" aria-label="Add Label">
          <IconButton className={classes.iconBtn}>
            <LabelOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  return (
    <>
      {renderItems()}
    </>
  );
};

NoteSettings.propTypes = {
  isHovered: PropTypes.bool.isRequired,
};

export default NoteSettings;
