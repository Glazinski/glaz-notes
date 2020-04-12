import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import CreateList from './CreateList';
import uniqid from 'uniqid';
import NoteForm from './NoteForm';

// Redux
import { connect } from 'react-redux';
import { createNote } from '../../store/actions/notesActions';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// MUI icons
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    maxWidth: 520,
    backgroundColor: theme.palette.background.default,
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    margin: '0 auto 80px auto',
    transition: 'background-color .3s ease',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: theme.palette.text.disabled,
    marginLeft: '10px',
  },
  textField: {
    // width: 400,
    borderBottom: 'none',
    // marginLeft: 10,
    // marginRight: 10,
    padding: '0 10px 0 10px',
  },
  button: {
    color: theme.palette.text.primary,
  },
  textFieldLabel: {
    '&::placeholder': {
      color: theme.palette.text.primary,
      fontWeight: 'bold',
    },
    resize: {
      fontSize: 5,
    },
  },
}));

const CreateNote = (props) => {
  const { colors } = props;
  const classes = useStyles();
  const [formData, setFormData] = useState({
    noteId: uniqid(),
    title: '',
    content: '',
    createdAt: null,
    colorName: 'Default',
  });
  const [isFocused, setIsFocused] = useState(false);
  const [isListMode, setIsListMode] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleClose = () => {
    setIsListMode(false);
    setIsFocused(false);
  };

  const handleList = () => {
    setIsListMode(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleColor = (colorName) => {
    setFormData({ ...formData, colorName });
  };

  useEffect(() => {
    const { title, content } = formData;

    if (
      !isFocused && (title.length > 0 || content.length > 0)
      // eslint-disable-next-line no-mixed-operators
      && !!title.trim().length || !!content.trim().length
    ) {
      setFormData({ ...formData, createdAt: new Date().toISOString() });
      props.createNote(uniqid(), formData);
      setFormData({
        ...formData, noteId: uniqid(), title: '', content: '', colorName: 'Default',
      });
    } else {
      setFormData({
        ...formData, noteId: uniqid(), title: '', content: '', colorName: 'Default',
      });
    }
  }, [isFocused]);

  const color = _.some(colors) ? colors[formData.colorName].color : null;
  // console.log(_.some(colors));

  return (
    <ClickAwayListener onClickAway={() => handleClose()}>
      <Paper
        onClick={!isFocused ? handleFocus : null}
        className={classes.paper}
        elevation={5}
        variant="outlined"
        style={{ backgroundColor: color }}
      >
        {isFocused ? (
          <NoteForm
            noteId={formData.noteId}
            formData={formData}
            handleChange={handleChange}
            handleClose={handleClose}
            handleColor={handleColor}
            isMovable={false}
          />
        ) : (
          <div className={classes.content}>
            <Typography className={classes.title}>Take a note...</Typography>
            <Tooltip title="New list" aria-label="New list">
              <IconButton onClick={handleList}>
                <CheckBoxOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </Paper>
    </ClickAwayListener>
  );
};

CreateNote.propTypes = {
  createNote: PropTypes.func.isRequired,
  colors: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
  colors: _.mapKeys(state.ui.colors, 'name'),
});

export default connect(mapStateToProps, { createNote })(CreateNote);
