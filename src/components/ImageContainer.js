import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    marginBottom: 5,
  },
  image: {
    width: '100%',
  },
  viewImage: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 'auto',
  },
  delImage: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: theme.palette.background.default,
    transition: 'opacity .3s ease',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const ImageContainer = (props) => {
  const classes = useStyles();
  const {
    id,
    imageUrl,
    handleImageDelete,
    preview,
    loadingNoteImage: {
      noteId, loading,
    },
  } = props;
  const [isHovered, setIsHovered] = useState(false);
  const { pathname } = useLocation();

  const handleHoverOn = () => setIsHovered(true);

  const handleHoverOff = () => setIsHovered(false);

  const renderImage = () => {
    if (noteId === id && loading) {
      return (
        <div className={classes.loadingContainer}>
          <CircularProgress size={50} />
        </div>
      );
    } if (preview && imageUrl) {
      return (
        <div style={{ marginBottom: 5 }}>
          <img className={classes.viewImage} src={imageUrl} alt="" />
        </div>
      );
    } if (imageUrl) {
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

  return (
    <>
      {renderImage()}
    </>
  );
};

ImageContainer.defaultProps = {
  imageUrl: null,
  id: null,
  preview: false,
  noteId: null,
  loading: false,
  loadingNoteImage: null,
  handleImageDelete: null,
};

ImageContainer.propTypes = {
  imageUrl: PropTypes.string,
  handleImageDelete: PropTypes.func,
  id: PropTypes.string,
  preview: PropTypes.bool,
  loadingNoteImage: PropTypes.oneOfType([PropTypes.object]),
  noteId: PropTypes.string,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  loadingNoteImage: state.notes.loadingNoteImage,
});

export default connect(mapStateToProps)(ImageContainer);
