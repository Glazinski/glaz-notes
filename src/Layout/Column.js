import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import Note from '../components/notes/Note';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '256px',
    // border: '1px solid black',
    // margin: '8px 0',
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
  const { notes, column: { id } } = props;

  return (
    <div className={classes.container}>
      <Droppable
        droppableId={id}
        // isDropDisabled={props.isDropDisabled}
      >
        {(provided, snapshot) => (
          <div
            className={classes.list}
            ref={provided.innerRef}
            {...provided.droppableProps}
            // isDraggingOver={snapshot.isDraggingOver}
          >
            {notes.map((note, index) => <Note key={note.id} note={note} index={index} />)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

Column.propTypes = {
  notes: PropTypes.array.isRequired,
  column: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Column;