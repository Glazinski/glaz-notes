import React, { useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import DialogNote from './DialogNote';
import NoteSettings from './NoteSettings';
import ChipList from './labels/ChipList';
import ImageContainer from '../ImageContainer';
import { useLocation, useParams } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import {
  moveNoteFromTo,
  changeNoteColor,
  starNote,
  changeNoteLabels,
  deleteNoteFromState,
  uploadNoteImage,
} from '../../store/actions/notesActions';

import {
  changeLabelNoteIds,
} from '../../store/actions/labelsActions';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    // minHeight: 100,
    minHeight: 100,
    maxWidth: 238,
    backgroundColor: theme.palette.background.default,
    padding: '10px',
    margin: '10px 0',
    transition: 'background-color .3s ease, opacity .3s ease',
    '&:hover': {
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      cursor: 'default',
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'none',
      width: '100%',
    },
  },
  title: {
    // overflowWrap: 'anywhere',
    wordBreak: 'break-word',
    direction: 'rtl',
    textAlign: 'left',
    textIndent: '12%',
  },
  btn: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    opacity: '0',
  },
  content: {
    margin: '5px 0 5px 0',
    minHeight: '20px',
    overflowWrap: 'anywhere',
  },
}));

const Note = (props) => {
  const classes = useStyles();
  const {
    colors,
    index,
    moveNoteFromTo,
    changeNoteColor,
    changeNoteLabels,
    changeLabelNoteIds,
    starNote,
    deleteNoteFromState,
    uploadNoteImage,
    labelsList,
    note: {
      id, title, content, colorName, labels, imageUrl,
    },
  } = props;
  const { pathname } = useLocation();
  const { labelId: labelIdParam } = useParams();
  const coll = pathname === '/' || pathname.includes('label') ? 'notes' : pathname.substr(1);

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

  const handleImageUpload = (tmpImage = null, fd) => {
    uploadNoteImage(id, fd, coll);
  };

  const handleLabels = (labelsArr, labelId, type) => {
    if (labelId && type) {
      const shouldBeMoved = labelIdParam === labelsList[labelId].labelId && type === 'del';

      const newNoteIds = type === 'del'
        ? labelsList[labelId].noteIds.filter((item) => item !== id)
        : [id, ...labelsList[labelId].noteIds];

      changeLabelNoteIds(labelId, newNoteIds);
      changeNoteLabels(id, labelsArr);
      if (shouldBeMoved) deleteNoteFromState(id);
    }
  };

  const color = colorName ? colors[colorName].color : colors.Default;

  return (
    <Draggable
      draggableId={id}
      index={index}
      isDragDisabled={pathname !== '/'}
    >
      {(provided) => (
        <ClickAwayListener onClickAway={handleHoverOff}>
          <div
            onMouseEnter={handleHoverOn}
            onMouseLeave={handleHoverOff}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Paper
              className={classes.container}
              variant="outlined"
              style={open ? {
                backgroundColor: color,
                opacity: '0',
              } : {
                backgroundColor: color,
                opacity: '1',
              }}
            >
              <div
                aria-hidden="true"
                className={classes.btn}
                onClick={handleClickOpen}
              />
              {open ? (
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
              ) : null}
              {/* <img src={imageUrl} alt="note" /> */}
              <ImageContainer imageUrl={imageUrl} />
              {title.length <= 0 ? (
                <div className={classes.content}>
                  {content}
                </div>
              ) : (
                <Typography className={classes.title} variant="h6">
                  {title}
                </Typography>
              )}
              <div className={classes.content}>
                {title.length <= 0 ? null : content}
              </div>
              <div style={{ margin: '5px 0' }}>
                <ChipList
                  labels={labels}
                  handleLabels={handleLabels}
                />
              </div>
              <NoteSettings
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
      )}
    </Draggable>
  );
};

Note.propTypes = {
  index: PropTypes.number.isRequired,
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
};

const mapStateToProps = (state) => ({
  colors: _.mapKeys(state.ui.colors, 'name'),
  labelsList: state.labels,
});

export default connect(
  mapStateToProps,
  {
    moveNoteFromTo,
    changeNoteColor,
    starNote,
    changeNoteLabels,
    changeLabelNoteIds,
    deleteNoteFromState,
    uploadNoteImage,
  },
)(Note);
