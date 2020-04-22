/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import ChangeColor from './NoteOperations/ChangeColor';
import DeleteNote from './NoteOperations/Delete';
import DeleteForever from './NoteOperations/DeleteForever';
import Restore from './NoteOperations/Restore';
import ArchiveNote from './NoteOperations/ArchiveNote';
import UnArchiveNote from './NoteOperations/UnArchiveNote';
import StarNote from './NoteOperations/StarNote';
import SetLabel from './NoteOperations/SetLabel';
import UploadNoteImg from './NoteOperations/UploadNoteImg';
import { useLocation } from 'react-router-dom';

// MUI
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    // marginTop: '5px',
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
  date: {
    color: theme.palette.text.disabled,
  },
}));

const NoteSettings = (props) => {
  const {
    isHovered,
    isMovable,
    handleNoteMove,
    handleColor,
    handleStar,
    handleLabels,
    handleImageUpload,
    note: {
      id: noteId, colorName: colorId, isStarred, labels,
    },
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
      <>
        <StarNote
          isHovered={isHovered}
          handleStar={handleStar}
          isStarred={isStarred}
        />
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

          <UploadNoteImg handleImageUpload={handleImageUpload} />
          {pathname === '/archive' ? (
            <UnArchiveNote handleNoteMove={handleNoteMove} />
          ) : isMovable ? (
            <ArchiveNote handleNoteMove={handleNoteMove} />
          ) : null}
          {isMovable ? (
            <DeleteNote handleNoteMove={handleNoteMove} />
          ) : null}

          <SetLabel
            labels={labels}
            handleLabels={handleLabels}
          />
        </div>
      </>
    );
  };

  return (
    <>
      {renderItems()}
    </>
  );
};

NoteSettings.defaultProps = {
  id: null,
  colorName: null,
  handleNoteMove: null,
  handleColor: null,
  handleStar: null,
  handleLabels: null,
  isStarred: null,
};

NoteSettings.propTypes = {
  isHovered: PropTypes.bool.isRequired,
  id: PropTypes.string,
  isMovable: PropTypes.bool.isRequired,
  colorName: PropTypes.string,
  handleNoteMove: PropTypes.func,
  handleColor: PropTypes.func,
  handleStar: PropTypes.func,
  handleLabels: PropTypes.func,
  isStarred: PropTypes.bool,
  note: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default NoteSettings;
