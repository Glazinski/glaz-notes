import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import Note from '../components/notes/Note';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: '256px',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
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
        {(provided) => (
          <div
            className={classes.list}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {!notes.includes(null) ? notes.map((note, index) => (
              <Note key={note.id} note={note} index={index} />
            )) : null}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

Column.defaultProps = {
  notes: null,
};

Column.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
  column: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Column;
