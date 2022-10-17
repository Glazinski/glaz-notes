import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    top: 10,
    right: 7,
    transition: 'opacity .3s ease',
    [theme.breakpoints.down('sm')]: {
      top: 15,
      right: 10,
    },
  },
  iconBtn: {
    padding: '7px',
    color: theme.palette.text.primary,
  },
}));

const StarNote = (props) => {
  const { isHovered, handleStar, isStarred } = props;
  const classes = useStyles();

  const [isNoteStarred, setIsNoteStarred] = useState(isStarred);

  useEffect(() => {
    setIsNoteStarred(isStarred);
  }, [isStarred]);

  const handleStarClick = () => {
    handleStar(!isNoteStarred);
    setIsNoteStarred(!isNoteStarred);
  };

  return (
    <div
      className={classes.container}
      style={
        isHovered
          ? { opacity: '1', pointerEvents: 'auto' }
          : { opacity: '0', pointerEvents: 'none' }
      }
    >
      <Tooltip title="Star note" aria-label="Star note">
        <IconButton onClick={handleStarClick} size="small">
          {isNoteStarred ? <StarIcon /> : <StarBorderOutlinedIcon />}
        </IconButton>
      </Tooltip>
    </div>
  );
};

StarNote.defaultProps = {
  isStarred: false,
};

StarNote.propTypes = {
  isHovered: PropTypes.bool.isRequired,
  handleStar: PropTypes.func.isRequired,
  isStarred: PropTypes.bool,
};

export default StarNote;
