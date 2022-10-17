import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Column from './Column';

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

  if (msg)
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{msg}</div>
    );

  return (
    <>
      {initData.starredColumns['starred-column-1'].noteIds.length > 0 && (
        <>
          <div
            className={classes.container}
            style={{
              marginBottom: '50px',
            }}
          >
            {initData.starredColumnOrder.map((columnId) => {
              const column = initData.starredColumns[columnId];
              const notes = column.noteIds.map(
                (noteId) => initData.notes[noteId]
              );

              return (
                <Column
                  key={column.id}
                  column={column}
                  notes={notes}
                  title="STARRED"
                />
              );
            })}
          </div>
        </>
      )}

      {initData.columns['column-1'].noteIds.length > 0 && (
        <>
          <div className={classes.container}>
            {initData.columnOrder.map((columnId) => {
              const column = initData.columns[columnId];
              const notes = column.noteIds.map(
                (noteId) => initData.notes[noteId]
              );

              return (
                <Column
                  key={column.id}
                  column={column}
                  notes={notes}
                  title="OTHERS"
                />
              );
            })}
          </div>
        </>
      )}
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
