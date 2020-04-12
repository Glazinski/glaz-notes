/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import ChangeColor from './NoteOperations/ChangeColor';
import DeleteNote from './NoteOperations/Delete';
import DeleteForever from './NoteOperations/DeleteForever';
import Restore from './NoteOperations/Restore';
import ArchiveNote from './NoteOperations/ArchiveNote';
import UnArchiveNote from './NoteOperations/UnArchiveNote';
import { useLocation } from 'react-router-dom';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// MUI icons
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
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
    transition: 'opacity .3s ease',
  },
  iconBtn: {
    padding: '7px',
    color: theme.palette.text.primary,
  },
}));

const NoteSettings = (props) => {
  const {
    isHovered, noteId, isMovable, colorId, handleNoteMove, handleColor,
  } = props;
  const classes = useStyles();
  const { pathname } = useLocation();
  const coll = pathname === '/' ? 'notes' : pathname.substr(1);

  const renderItems = () => {
    if (pathname === '/bin') {
      return (
        <div
          className={classes.binContainer}
          style={isHovered ? { opacity: '1', pointerEvents: 'auto' } : { opacity: '0', pointerEvents: 'none' }}
        >
          <DeleteForever noteId={noteId} />
          <Restore handleNoteMove={handleNoteMove} />
        </div>
      );
    }

    return (
      <div
        className={classes.container}
        style={isHovered ? { opacity: '1', pointerEvents: 'auto' } : { opacity: '0', pointerEvents: 'none' }}
      >
        <ChangeColor
          colorId={colorId}
          noteId={noteId}
          coll={coll}
          handleColor={handleColor}
        />

        <Tooltip title="Add image" aria-label="Add image">
          <IconButton className={classes.iconBtn}>
            <ImageOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {pathname === '/archive' ? (
          <UnArchiveNote handleNoteMove={handleNoteMove} />
        ) : isMovable ? (
          <ArchiveNote handleNoteMove={handleNoteMove} />
        ) : null}
        {isMovable ? (
          <DeleteNote handleNoteMove={handleNoteMove} />
        ) : null}

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

NoteSettings.defaultProps = {
  noteId: null,
  colorId: null,
  handleNoteMove: null,
  handleColor: null,
};

NoteSettings.propTypes = {
  isHovered: PropTypes.bool.isRequired,
  noteId: PropTypes.string,
  isMovable: PropTypes.bool.isRequired,
  colorId: PropTypes.string,
  handleNoteMove: PropTypes.func,
  handleColor: PropTypes.func,
};

export default NoteSettings;
