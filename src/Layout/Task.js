import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    border: '1px solid black',
    padding: '8px',
    displa: 'flex',
  },
}));

const Task = (props) => {
  const classes = useStyles();

  return (
    <Draggable
      draggableId={props.note.id}
      index={props.index}
    >
      {(provided, snapshot) => (
        <div
          className={classes.container}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          // isDragging={snapshot.isDragging}
        >
          {props.note.content}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
