/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useStyles } from './NoteSettings.styles';
import UploadNoteImg from './NoteOperations/UploadNoteImg';
import ChangeColor from './NoteOperations/ChangeColor';
import DeleteNote from './NoteOperations/Delete';
import DeleteForever from './NoteOperations/DeleteForever';
import Restore from './NoteOperations/Restore';
import ArchiveNote from './NoteOperations/ArchiveNote';
import UnArchiveNote from './NoteOperations/UnArchiveNote';
import StarNote from './NoteOperations/StarNote';
import SetLabel from './NoteOperations/SetLabel';

const NoteSettings = (props) => {
  const {
    isHovered,
    isMovable,
    handleNoteMove,
    handleColor,
    handleStar,
    handleLabels,
    handleImageUpload,
    settingsClassName,
    note: { id: noteId, colorName: colorId, isStarred, labels },
  } = props;
  const classes = useStyles(props);
  const { pathname } = useLocation();
  const stylesOnHover = isHovered
    ? { opacity: '1', pointerEvents: 'auto' }
    : { opacity: '0', pointerEvents: 'none' };

  const renderItems = () => {
    if (pathname === '/bin') {
      return (
        <div className={classes.binContainer} style={stylesOnHover}>
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
          className={`${classes.container} ${settingsClassName}`}
          style={stylesOnHover}
        >
          <ChangeColor
            colorId={colorId}
            noteId={noteId}
            handleColor={handleColor}
          />

          <UploadNoteImg handleImageUpload={handleImageUpload} />
          {pathname === '/archive' ? (
            <UnArchiveNote handleNoteMove={handleNoteMove} />
          ) : isMovable ? (
            <ArchiveNote handleNoteMove={handleNoteMove} />
          ) : null}
          {isMovable && <DeleteNote handleNoteMove={handleNoteMove} />}

          {pathname !== '/archive' && (
            <SetLabel labels={labels} handleLabels={handleLabels} />
          )}
        </div>
      </>
    );
  };

  return <>{renderItems()}</>;
};

NoteSettings.defaultProps = {
  id: null,
  colorName: null,
  handleNoteMove: null,
  handleColor: null,
  handleStar: null,
  handleLabels: null,
  isStarred: null,
  handleImageUpload: null,
  settingsClassName: null,
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
  handleImageUpload: PropTypes.func,
  isStarred: PropTypes.bool,
  note: PropTypes.oneOfType([PropTypes.object]).isRequired,
  settingsClassName: PropTypes.string,
};

const mapStateToProps = (state) => ({
  view: state.ui.view,
});

export default connect(mapStateToProps)(NoteSettings);
