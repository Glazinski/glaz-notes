import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    marginBottom: 5,
  },
  image: {
    width: '100%',
  },
  delImage: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: theme.palette.background.default,
    transition: 'opacity .3s ease',
  },
}));

const ImageContainer = (props) => {
  const classes = useStyles();
  const { imageUrl, handleImageDelete } = props;
  const [isHovered, setIsHovered] = useState(false);
  const { pathname } = useLocation();

  const handleHoverOn = () => setIsHovered(true);

  const handleHoverOff = () => setIsHovered(false);

  return (
    <>
      {imageUrl ? (
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
      ) : null}
    </>
  );
};

ImageContainer.defaultProps = {
  imageUrl: null,
};

ImageContainer.propTypes = {
  imageUrl: PropTypes.string,
  handleImageDelete: PropTypes.func.isRequired,
};

export default ImageContainer;
