import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  container: {
    width: 500,
    heihgt: 200,
    padding: '10px',
  },
  dialog: {
    marginBottom: '200px',
  },
}));

const DialogNote = (props) => {
  const { noteId, content, title } = props;
  const classes = useStyles();
  console.log(noteId);

  return (
    <Paper className={classes.container}>
      <span>{title}</span>
    </Paper>
  );
};

DialogNote.propTypes = {
  noteId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default DialogNote;
