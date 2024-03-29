/* eslint-disable no-mixed-operators */
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './CreateNote.styles';
import NoteForm from './NoteForm';
import { createNote, uploadNoteImage } from '../../store/notes/actions';
import { changeLabelNoteIds } from '../../store/labels/actions';

const CreateNote = (props) => {
  const classes = useStyles();
  const { labels } = props;
  const colors = useSelector((state) => _.mapKeys(state.ui.colors, 'name'));
  const labelsList = useSelector((state) => state.labels.labels);
  const dispatch = useDispatch();
  const { labelId: labelIdParam } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    createdAt: null,
    colorName: 'Default',
    isStarred: false,
    labels,
    imageUrl: '',
  });
  const [tmpImage, setTmpImage] = useState(null);
  const [tmpFD, setTmpFD] = useState(null);
  const [isOpened, setIsOpened] = useState(false);

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

  const handleImageUpload = (fd, tmpImg) => {
    setTmpImage(tmpImg);
    setTmpFD(fd);
  };

  const handleImageDelete = () => {
    setTmpImage(null);
    setTmpFD(null);
  };

  const resetForm = () => {
    handleImageDelete();
    setFormData({
      ...formData,
      title: '',
      content: '',
      colorName: 'Default',
      isStarred: false,
      labels,
    });
  };

  const changeNoteIdsHelper = (noteId) => {
    if (formData.labels.length > 0) {
      formData.labels.forEach((labelId) => {
        const newNoteIds = [noteId, ...labelsList[labelId].noteIds];

        dispatch(changeLabelNoteIds(labelId, newNoteIds));
      });
    }
  };

  const handleOpen = () => {
    setIsOpened(true);
  };

  const handleSubmit = () => {
    const { title, content } = formData;

    if (
      ((title.length > 0 || content.length > 0) &&
        (title.trim().length || content.trim().length)) ||
      tmpImage
    ) {
      const noteId = uniqid();

      if (
        labelIdParam &&
        !_.includes(formData.labels, labelsList[labelIdParam].labelId)
      ) {
        changeNoteIdsHelper(noteId);
        // True as a third argument means that I don't want to
        // appear note on the screen when I create note
        dispatch(createNote(noteId, formData, false));
      } else {
        changeNoteIdsHelper(noteId);
        dispatch(createNote(noteId, formData, true));
      }

      if (tmpFD) {
        dispatch(uploadNoteImage(noteId, tmpFD, 'notes'));
      }
    }
  };

  const handleClose = () => {
    setIsOpened(false);

    handleSubmit();

    resetForm();
  };

  useEffect(() => setFormData({ ...formData, labels }), [labels]);

  const color = _.some(colors) ? colors[formData.colorName].color : null;

  return (
    <Paper
      onClick={!isOpened ? handleOpen : null}
      className={classes.paper}
      elevation={5}
      variant="outlined"
      style={{ backgroundColor: color }}
    >
      {isOpened ? (
        <NoteForm
          note={formData}
          image={tmpImage}
          handleChange={handleChange}
          handleClose={handleClose}
          handleColor={handleColor}
          handleStar={handleStar}
          handleLabels={handleLabels}
          handleImageUpload={handleImageUpload}
          handleImageDelete={handleImageDelete}
          isMovable={false}
        />
      ) : (
        <div className={classes.content}>
          <Typography className={classes.title}>Take a note...</Typography>
        </div>
      )}
    </Paper>
  );
};

CreateNote.defaultProps = {
  labels: [],
};

CreateNote.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string),
};

export default CreateNote;
