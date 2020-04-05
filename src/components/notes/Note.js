import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import ModalNote from './ModalNote';
import NoteSettings from './NoteSettings';
import { useLocation } from 'react-router-dom';

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
    '&:hover': {
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      cursor: 'default',
    },
    // transition: 'opacity .3s ease',
  },
  title: {
    overflowWrap: 'anywhere',
  },
  btn: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    opacity: '0',
    // backgroundColor: 'red',
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
    index, note: { id, title, content },
  } = props;
  const { pathname } = useLocation();

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

  return (
    <Draggable
      draggableId={id}
      index={index}
      isDragDisabled={pathname !== '/'}
    >
      {(provided) => (
        <ClickAwayListener onClickAway={handleHoverOff}>
          <Paper
            onMouseEnter={handleHoverOn}
            onMouseLeave={handleHoverOff}
            className={classes.container}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            variant="outlined"
            // style={open ? {transform: translate}}
          >
            <div
              aria-hidden="true"
              className={classes.btn}
              onClick={handleClickOpen}
            />
            {open ? (
            // <DialogWindow handleClose={handleClose} open={open}>
              <ModalNote
                handleClose={handleClose}
                open={open}
                noteId={id}
                title={title}
                content={content}
                handleHoverClose={handleHoverOff}
              />
            // </DialogWindow>
            ) : null}
            {/* {title} */}
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
            <NoteSettings
              noteId={id}
              isHovered={isHovered}
              isRemovable
            />
          </Paper>
        </ClickAwayListener>
      )}
    </Draggable>
  );
};

Note.propTypes = {
  index: PropTypes.number.isRequired,
  note: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Note;
