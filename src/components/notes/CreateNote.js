import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import CreateList from './CreateList';
import uniqid from 'uniqid';
import NoteForm from './NoteForm';

// Redux
import { connect } from 'react-redux';
import { createNote } from '../../store/actions/notesActions';
import { changeLabelNoteIds } from '../../store/actions/labelsActions';

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
    position: 'relative',
    // maxWidth: 520,
    width: 520,
    maxHeight: 620,
    backgroundColor: theme.palette.background.default,
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    margin: '0 auto 80px auto',
    transition: 'background-color .3s ease',
    overflowY: 'auto',
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
    borderBottom: 'none',
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
  const {
    colors,
    labelsList,
    changeLabelNoteIds,
    createNote,
  } = props;
  const classes = useStyles();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    createdAt: null,
    colorName: 'Default',
    isStarred: false,
    labels: [],
    imageUrl: '',
  });
  const [tmpImage, setTmpImage] = useState(null);
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

  const handleStar = (newIsStarred) => {
    setFormData({ ...formData, isStarred: newIsStarred });
  };

  const handleLabels = (labelsArr) => {
    setFormData({ ...formData, labels: [...labelsArr] });
  };

  const handleImageUpload = (tmpImage, fd) => {
    setTmpImage(tmpImage);
  };

  useEffect(() => {
    const { title, content } = formData;

    if (
      !isFocused && (title.length > 0 || content.length > 0)
      // eslint-disable-next-line no-mixed-operators
      && !!title.trim().length || !!content.trim().length
    ) {
      setFormData({ ...formData });
      const noteId = uniqid();
      if (formData.labels.length > 0) {
        formData.labels.forEach((labelId) => {
          const newNoteIds = [noteId, ...labelsList[labelId].noteIds];

          changeLabelNoteIds(labelId, newNoteIds);
        });
      }
      createNote(noteId, formData);
      setTmpImage(null);
      setFormData({
        ...formData, title: '', content: '', colorName: 'Default', isStarred: false, labels: [],
      });
    } else {
      setTmpImage(null);
      setFormData({
        ...formData, title: '', content: '', colorName: 'Default', isStarred: false, labels: [],
      });
    }
  }, [isFocused]);

  const color = _.some(colors) ? colors[formData.colorName].color : null;

  return (
  // <ClickAwayListener onClickAway={handleClose}>
    <Paper
      onClick={!isFocused ? handleFocus : null}
      className={classes.paper}
      elevation={5}
      variant="outlined"
      style={{ backgroundColor: color }}
    >
      {isFocused ? (
        <NoteForm
          note={formData}
          image={tmpImage}
          handleChange={handleChange}
          handleClose={handleClose}
          handleColor={handleColor}
          handleStar={handleStar}
          handleLabels={handleLabels}
          handleImageUpload={handleImageUpload}
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
  // </ClickAwayListener>
  );
};

CreateNote.propTypes = {
  createNote: PropTypes.func.isRequired,
  changeLabelNoteIds: PropTypes.func.isRequired,
  colors: PropTypes.oneOfType([PropTypes.object]).isRequired,
  labelsList: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
  colors: _.mapKeys(state.ui.colors, 'name'),
  labelsList: state.labels,
});

export default connect(mapStateToProps, { createNote, changeLabelNoteIds })(CreateNote);
