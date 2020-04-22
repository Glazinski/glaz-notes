import React, { useState } from 'react';
import PropTypes from 'prop-types';

// MUI
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    marginBottom: 5,
  },
  image: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const ImageContainer = (props) => {
  const classes = useStyles();
  const { imageUrl } = props;
  const [isHovered, setIsHovered] = useState(false);

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
        </div>
      ) : null}
    </>
  );
};

ImageContainer.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default ImageContainer;
