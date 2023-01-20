import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useStyles } from './ImageContainer.styles';

const ImageContainer = (props) => {
  const { id, imageUrl, handleImageDelete, preview } = props;
  const loadingNoteImage = useSelector((state) => state.notes.loadingNoteImage);
  const classes = useStyles();
  const [isHovered, setIsHovered] = useState(false);
  const { pathname } = useLocation();

  const handleHoverOn = () => setIsHovered(true);

  const handleHoverOff = () => setIsHovered(false);

  const renderImage = () => {
    if (
      id === loadingNoteImage[loadingNoteImage.findIndex((nid) => nid === id)]
    ) {
      return (
        <div className={classes.loadingContainer}>
          <CircularProgress size={50} />
        </div>
      );
    }
    if (preview && imageUrl) {
      return (
        <div style={{ marginBottom: 5 }}>
          <img className={classes.viewImage} src={imageUrl} alt="" />
        </div>
      );
    }
    if (imageUrl) {
      return (
        <div
          className={classes.container}
          onMouseEnter={handleHoverOn}
          onMouseLeave={handleHoverOff}
        >
          <img className={classes.image} src={imageUrl} alt="note" />
          {pathname !== '/bin' ? (
            <div
              className={classes.delImage}
              style={isHovered ? { opacity: '1' } : { opacity: '0' }}
            >
              <Tooltip title="Remove" aria-label="Remove">
                <IconButton onClick={handleImageDelete} size="small">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          ) : null}
        </div>
      );
    }
    return null;
  };

  return <>{renderImage()}</>;
};

ImageContainer.defaultProps = {
  imageUrl: null,
  id: null,
  preview: false,
  handleImageDelete: null,
};

ImageContainer.propTypes = {
  imageUrl: PropTypes.string,
  handleImageDelete: PropTypes.func,
  id: PropTypes.string,
  preview: PropTypes.bool,
};

export default ImageContainer;
