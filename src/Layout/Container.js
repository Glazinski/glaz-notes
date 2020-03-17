import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './DragColumn';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
}));

const DragContainer = (props) => {
  const { layout } = props;
  const [initData, setInitData] = useState(layout);

  useEffect(() => {
    setInitData(layout);
  }, [layout]);

  const classes = useStyles();

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      return;
    }

    const start = initData.columns[source.droppableId];
    const finish = initData.columns[destination.droppableId];

    if (start === finish) {
      const newNoteIds = Array.from(start.noteIds);
      newNoteIds.splice(source.index, 1);
      newNoteIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        noteIds: newNoteIds,
      };

      const newState = {
        ...initData,
        columns: {
          ...initData.columns,
          [newColumn.id]: newColumn,
        },
      };

      console.log(newState);
      setInitData(newState);
      return;
    }

    const startNoteIds = Array.from(start.noteIds);
    startNoteIds.splice(source.index, 1);
    const newStart = {
      ...start,
      noteIds: startNoteIds,
    };

    const finishNoteIds = Array.from(finish.noteIds);
    finishNoteIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      noteIds: finishNoteIds,
    };

    const newState = {
      ...initData,
      columns: {
        ...initData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    console.log(newState);
    setInitData(newState);
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <div className={classes.container}>
        {initData.columnOrder.map((columnId) => {
          const column = initData.columns[columnId];
          const notes = column.noteIds.map((noteId) => initData.notes[noteId]);

          return <Column key={column.id} column={column} notes={notes} />;
        })}
      </div>
    </DragDropContext>
  );
};

DragContainer.propTypes = {
  layout: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default DragContainer;
