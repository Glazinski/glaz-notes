import React, { useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import DialogNote from './DialogNote';
import NoteSettings from './NoteSettings';
import ChipList from './labels/ChipList';
import { useLocation } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import {
  moveNoteFromTo,
  changeNoteColor,
  starNote,
  changeNoteLabels,
} from '../../store/actions/notesActions';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    minHeight: 100,
    backgroundColor: theme.palette.background.default,
    padding: '10px',
    margin: '10px 0',
    transition: 'background-color .3s ease, opacity .3s ease',
    '&:hover': {
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      cursor: 'default',
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
    starNote,
    note: {
      id, title, content, colorName, labels,
    },
  } = props;
  const { pathname } = useLocation();
  const coll = pathname === '/' ? 'notes' : pathname.substr(1);

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

  const handleLabels = (labelsArr) => {
    changeNoteLabels(id, labelsArr, coll);
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
                  coll={coll}
                />
              ) : null}
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
              <ChipList
                labels={labels}
                handleLabels={handleLabels}
              />
              <NoteSettings
                isHovered={isHovered}
                isMovable
                handleNoteMove={handleNoteMove}
                handleColor={handleColor}
                handleStar={handleStar}
                handleLabels={handleLabels}
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
  moveNoteFromTo: PropTypes.func.isRequired,
  changeNoteColor: PropTypes.func.isRequired,
  changeNoteLabels: PropTypes.func.isRequired,
  starNote: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  colors: _.mapKeys(state.ui.colors, 'name'),
});

export default connect(
  mapStateToProps,
  {
    moveNoteFromTo,
    changeNoteColor,
    starNote,
    changeNoteLabels,
  },
)(Note);
