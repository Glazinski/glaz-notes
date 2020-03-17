import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: 100,
    padding: '10px',
    margin: '10px 0',
  },
  paper: {
    width: 238,
    height: 56,
    border: '1px solid black',
  },
}));

const Note = (props) => {
  const classes = useStyles();
  const { index, note: { id, title, content } } = props;

  return (
    <Draggable
      draggableId={id}
      index={index}
    >
      {(provided, snapshot) => (
        <Paper
          className={classes.container}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          variant="outlined"
          // isDragging={snapshot.isDragging}
        >
          <Typography variant="h6">{title}</Typography>
          {content}
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
