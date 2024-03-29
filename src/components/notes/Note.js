import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useLocation, useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { useStyles } from './Note.styles';
import { changeLabelNoteIds } from '../../store/labels/actions';
import {
  moveNoteFromTo,
  changeNoteColor,
  starNote,
  changeNoteLabels,
  deleteNoteFromState,
  uploadNoteImage,
} from '../../store/notes/actions';
import DialogNote from './DialogNote';
import NoteSettings from './NoteSettings';
import ChipList from './labels/ChipList';
import ImageContainer from '../ImageContainer';

const Note = (props) => {
  const classes = useStyles();
  const {
    colors,
    moveNoteFromTo,
    changeNoteColor,
    changeNoteLabels,
    changeLabelNoteIds,
    starNote,
    deleteNoteFromState,
    uploadNoteImage,
    labelsList,
    view,
    note: { id, title, content, colorName, labels, imageUrl },
  } = props;
  const { pathname } = useLocation();
  const { labelId: labelIdParam } = useParams();
  const coll =
    pathname === '/' || pathname.includes('label')
      ? 'notes'
      : pathname.substr(1);

  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleHoverOn = () => {
    setIsHovered(true);
  };

  const handleHoverOff = () => {
    setIsHovered(false);
  };

  const handleNoteMove = (to, msg) => {
    moveNoteFromTo(id, coll, to, msg);
  };

  const handleColor = (newColorName) => {
    changeNoteColor(id, newColorName, coll);
  };

  const handleStar = (newIsStarred) => {
    starNote(id, newIsStarred, coll);
  };

  const handleImageUpload = (fd) => {
    uploadNoteImage(id, fd, coll);
  };

  const handleLabels = (labelsArr, labelId, type) => {
    if (labelId && type) {
      const shouldBeMoved =
        labelIdParam === labelsList[labelId].labelId && type === 'del';

      const newNoteIds =
        type === 'del'
          ? labelsList[labelId].noteIds.filter((item) => item !== id)
          : [id, ...labelsList[labelId].noteIds];

      changeLabelNoteIds(labelId, newNoteIds);
      changeNoteLabels(id, labelsArr);
      if (shouldBeMoved) deleteNoteFromState(id);
    }
  };

  const color = colorName ? colors[colorName].color : colors.Default;

  return (
    <ClickAwayListener onClickAway={handleHoverOff}>
      <div onMouseEnter={handleHoverOn} onMouseLeave={handleHoverOff}>
        <Paper
          className={classes.container}
          variant="outlined"
          style={
            open
              ? {
                  backgroundColor: color,
                  opacity: '0',
                  maxWidth: view === 'list' ? '525px' : null,
                }
              : {
                  backgroundColor: color,
                  opacity: '1',
                  maxWidth: view === 'list' ? '525px' : null,
                }
          }
        >
          <div
            aria-hidden="true"
            className={classes.btn}
            onClick={handleClickOpen}
          />
          {open && (
            <DialogNote
              handleClose={handleClose}
              open={open}
              color={color}
              note={props.note}
              handleHoverClose={handleHoverOff}
              handleNoteMove={handleNoteMove}
              handleColor={handleColor}
              handleStar={handleStar}
              handleLabels={handleLabels}
              handleImageUpload={handleImageUpload}
              coll={coll}
            />
          )}
          <ImageContainer id={id} imageUrl={imageUrl} preview />
          {title.length <= 0 ? (
            <div className={classes.content}>{content}</div>
          ) : (
            <Typography className={classes.title} variant="h6">
              {title}
            </Typography>
          )}
          <div className={classes.content}>
            {title.length <= 0 ? null : content}
          </div>
          <div style={{ margin: '10px 0' }}>
            <ChipList labels={labels} handleLabels={handleLabels} />
          </div>
          <NoteSettings
            settingsClassName={classes.note}
            isHovered={isHovered}
            isMovable
            handleNoteMove={handleNoteMove}
            handleColor={handleColor}
            handleStar={handleStar}
            handleLabels={handleLabels}
            handleImageUpload={handleImageUpload}
            coll={coll}
            note={props.note}
          />
        </Paper>
      </div>
    </ClickAwayListener>
  );
};

Note.propTypes = {
  note: PropTypes.oneOfType([PropTypes.object]).isRequired,
  colors: PropTypes.oneOfType([PropTypes.object]).isRequired,
  labelsList: PropTypes.oneOfType([PropTypes.object]).isRequired,
  moveNoteFromTo: PropTypes.func.isRequired,
  changeNoteColor: PropTypes.func.isRequired,
  changeNoteLabels: PropTypes.func.isRequired,
  changeLabelNoteIds: PropTypes.func.isRequired,
  deleteNoteFromState: PropTypes.func.isRequired,
  uploadNoteImage: PropTypes.func.isRequired,
  starNote: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  colors: _.mapKeys(state.ui.colors, 'name'),
  labelsList: state.labels.labels,
  view: state.ui.view,
});

export default connect(mapStateToProps, {
  moveNoteFromTo,
  changeNoteColor,
  starNote,
  changeNoteLabels,
  changeLabelNoteIds,
  deleteNoteFromState,
  uploadNoteImage,
})(Note);
