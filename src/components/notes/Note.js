import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import DialogeWindow from '../DialogeWindow';
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
    padding: '10px',
    margin: '10px 0',
    '&:hover': {
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      cursor: 'default',
    },
    // transition: 'opacity .3s ease',
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
  },
}));

const Note = (props) => {
  const classes = useStyles();
  const { index, note: { id, title, content } } = props;

  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <Draggable
      draggableId={id}
      index={index}
    >
      {(provided, snapshot) => (
        <Paper
          // onClick={handleClickOpen}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          className={classes.container}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          variant="outlined"
        >
          <div className={classes.btn} onClick={handleClickOpen} />
          {open ? (
            <DialogeWindow onClose={handleClose} open={open}>
              <ModalNote noteId={id} title={title} content={content} />
            </DialogeWindow>
          ) : null}
          <Typography variant="h6">{title}</Typography>
          <div className={classes.content}>
            {content}
          </div>
          <NoteSettings isHovered={isHovered} />
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
