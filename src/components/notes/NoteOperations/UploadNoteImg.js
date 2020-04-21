import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { uploadNoteImage } from '../../../store/actions/notesActions';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// MUI icons
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';

const useStyles = makeStyles((theme) => ({
  iconBtn: {
    padding: '7px',
    color: theme.palette.text.primary,
  },
}));

const UploadNoteImg = (props) => {
  const classes = useStyles();
  const fileInput = useRef(null);
  const { uploadNoteImage, handleImageUpload } = props;
  const [selectedImage, setSelectedImage] = useState(null);
  const [tmpImage, setTmpImage] = useState(null);

  // useEffect(() => uploadNoteImage(), []);

  const handleImageSelect = (event) => {
    // setSelectedImage(event.target.files[0]);
    // setTmpImage(URL.createObjectURL(event.target.files[0]));
    const selImage = event.target.files[0];
    const tmpImage = URL.createObjectURL(event.target.files[0]);

    const fd = new FormData();
    fd.append('image', selImage, selImage.name);
    handleImageUpload(tmpImage, fd);
  };

  // const handleFileUpload = () => {
  //   console.log('elo');
  //   const fd = new FormData();
  //   fd.append('image', selectedImage, 'elo');
  //   handleImageUpload(tmpImage, fd);
  // };

  return (
    <>
      <input
        style={{ display: 'none' }}
        hidden="hidden"
        type="file"
        onChange={handleImageSelect}
        ref={fileInput}
      />
      {/* <img src={selectedImage} alt="" /> */}
      <Tooltip title="Add image" aria-label="Add image">
        <IconButton onClick={() => fileInput.current.click()} className={classes.iconBtn}>
          <ImageOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  );
};

UploadNoteImg.propTypes = {
  uploadNoteImage: PropTypes.func.isRequired,
};

export default connect(null, { uploadNoteImage })(UploadNoteImg);
