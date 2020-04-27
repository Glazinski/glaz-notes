import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    // marginLeft: 70,
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

    // let notePosition = 0;
    // const colNum = 3;
    // const startColIndex = start.index;
    // const finishColIndex = finish.index;
    // console.log(source, destination);
    // console.log(start, finish);
    // console.log(startColIndex, finishColIndex);

    if (start === finish) {
      // notePosition = finishColIndex + (destination.index * colNum);
      // console.log('POZYCJA', notePosition);
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

      console.log('same col', newState);
      setInitData(newState);
      return;
    }

    // notePosition = finishColIndex + (destination.index * colNum);
    // console.log('POZYCJA', notePosition);

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

    console.log('new col', newState);
    setInitData(newState);
  };

  return (
    <>
      {initData.starredColumns['starred-column-1'].noteIds.length > 0 ? (
        <>
          <Typography className={classes.title} variant="overline">STARRED</Typography>
          <DragDropContext
            onDragEnd={onDragEnd}
          >
            <div
              className={classes.container}
              style={{
                marginBottom: '50px',
              }}
            >
              {initData.starredColumnOrder.map((columnId) => {
                const column = initData.starredColumns[columnId];
                const notes = column.noteIds.map((noteId) => initData.notes[noteId]);

                return <Column key={column.id} column={column} notes={notes} />;
              })}
            </div>
          </DragDropContext>
        </>
      ) : null}


      {initData.columns['column-1'].noteIds.length > 0 ? (
        <>
          <Typography
            className={classes.title}
            variant="overline"
          >
            OTHERS
          </Typography>
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
        </>
      ) : null}
    </>
  );
};

DragContainer.propTypes = {
  layout: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default DragContainer;
