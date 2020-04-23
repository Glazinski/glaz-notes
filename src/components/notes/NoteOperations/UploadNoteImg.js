import React, { useRef } from 'react';
import PropTypes from 'prop-types';

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
  const { handleImageUpload } = props;


  const handleImageSelect = (event) => {
    const selImage = event.target.files[0];
    const tmpImage = selImage ? URL.createObjectURL(selImage) : null;

    if (selImage) {
      const fd = new FormData();
      fd.append('image', selImage, selImage.name);
      handleImageUpload(tmpImage, fd);
    }
  };

  return (
    <>
      <input
        style={{ display: 'none' }}
        hidden="hidden"
        type="file"
        onChange={handleImageSelect}
        ref={fileInput}
      />
      <Tooltip title="Add image" aria-label="Add image">
        <IconButton onClick={() => fileInput.current.click()} className={classes.iconBtn}>
          <ImageOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  );
};

UploadNoteImg.propTypes = {
  handleImageUpload: PropTypes.func.isRequired,
};

export default UploadNoteImg;
