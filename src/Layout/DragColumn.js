import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '220px',
    margin: '8px',
    border: '1px solid black',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'colunn',
  },
  list: {
    padding: '8px',
    flexGrow: 1,
  },
}));

const Column = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Droppable
        droppableId={props.column.id}
        isDropDisabled={props.isDropDisabled}
      >
        {(provided, snapshot) => (
          <div
            className={classes.list}
            ref={provided.innerRef}
            {...provided.droppableProps}
            // isDraggingOver={snapshot.isDraggingOver}
          >
            {props.notes.map((note, index) => <Task key={note.id} note={note} index={index} />)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
