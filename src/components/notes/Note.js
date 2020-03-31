import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import DialogWindow from '../DialogWindow';
import ModalNote from './ModalNote';
import NoteSettings from './NoteSettings';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
  // title: {
  //   minHeight: '32px',
  // },
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
  },
}));

const Note = (props) => {
  const classes = useStyles();
  const { index, note: { id, title, content } } = props;

  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setIsHovered(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleHover = (event) => {
    event.stopPropagation();
    setIsHovered(!isHovered);
  };

  // const handleHoverOpen = (event) => {
  //   event.stopPropagation();
  //   setIsHovered(true);
  // };
  // const handleHoverClose = (event) => {
  //   event.stopPropagation();
  //   setIsHovered(false);
  // };

  // console.log(title.length <= 0 ? { content } : { title });

  return (
    <Draggable
      draggableId={id}
      index={index}
    >
      {(provided, snapshot) => (
        <Paper
          onMouseOver={handleHover}
          onMouseOut={handleHover}
          // onMouseEnter={handleHover}
          // onMouseLeave={handleHover}
          onFocus={() => null}
          onBlur={() => null}
          className={classes.container}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          variant="outlined"
        >
          <div
            className={classes.btn}
            onClick={handleClickOpen}
          />
          {open ? (
            <DialogWindow handleClose={handleClose} open={open}>
              <ModalNote noteId={id} title={title} content={content} />
            </DialogWindow>
          ) : null}
          {/* {title} */}
          {title.length <= 0 ? (
            <div className={classes.content}>
              {content}
            </div>
          ) : (
            <Typography variant="h6">
              {title}
            </Typography>
          )}
          <div className={classes.content}>
            {title.length <= 0 ? null : content}
          </div>
          <NoteSettings noteId={id} isHovered={isHovered} handleHoverClose={handleHover} />
        </Paper>
      )}
    </Draggable>
  );
};

Note.propTypes = {
  index: PropTypes.number.isRequired,
  note: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Note;
