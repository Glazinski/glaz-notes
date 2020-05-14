import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Container = (props) => {
  const { layout, msg } = props;
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

    let columnName = '';
    if (destination.droppableId.substr(0, destination.droppableId.length - 2) === 'starred-column') {
      columnName = 'starredColumns';
    } else {
      columnName = 'columns';
    }

    const start = initData[columnName][source.droppableId];
    const finish = initData[columnName][destination.droppableId];

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
        [columnName]: {
          ...initData[columnName],
          [newColumn.id]: newColumn,
        },
      };

      console.log('same col', newState);
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
      [columnName]: {
        ...initData[columnName],
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    console.log('new col', newState);
    setInitData(newState);
  };

  if (msg) return <div style={{ display: 'flex', justifyContent: 'center' }}>{msg}</div>;

  return (
    <>
      {initData.starredColumns['starred-column-1'].noteIds.length > 0 ? (
        <>
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

                return <Column key={column.id} column={column} notes={notes} title="STARRED" />;
              })}
            </div>
          </DragDropContext>
        </>
      ) : null}


      {initData.columns['column-1'].noteIds.length > 0 ? (
        <>
          <DragDropContext
            onDragEnd={onDragEnd}
          >
            <div className={classes.container}>
              {initData.columnOrder.map((columnId) => {
                const column = initData.columns[columnId];
                const notes = column.noteIds.map((noteId) => initData.notes[noteId]);

                return <Column key={column.id} column={column} notes={notes} title="OTHERS" />;
              })}
            </div>
          </DragDropContext>
        </>
      ) : null}
    </>
  );
};

Container.defaultProps = {
  msg: null,
};

Container.propTypes = {
  layout: PropTypes.oneOfType([PropTypes.object]).isRequired,
  msg: PropTypes.string,
};

export default Container;
