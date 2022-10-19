import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Note from '../components/notes/Note';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    minWidth: '256px',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  title: {
    position: 'absolute',
    top: -20,
    left: 10,
  },
  list: {
    padding: '8px',
    flexGrow: 1,
  },
}));

const Column = (props) => {
  const classes = useStyles();
  const {
    notes,
    title,
    column: { id },
  } = props;

  return (
    <div className={classes.container}>
      <Typography variant="overline" className={classes.title}>
        {id[id.length - 1] === '1' ? title : null}
      </Typography>
      <div className={classes.list}>
        {!notes.includes(null)
          ? notes.map((note, index) => (
              <Note key={note.id} note={note} index={index} />
            ))
          : null}
      </div>
    </div>
  );
};

Column.defaultProps = {
  notes: null,
};

Column.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
  column: PropTypes.oneOfType([PropTypes.object]).isRequired,
  title: PropTypes.string.isRequired,
};

export default Column;
