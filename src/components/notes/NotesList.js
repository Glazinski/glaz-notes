import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import DragContainer from '../../Layout/Container';
import { makeStyles } from '@material-ui/core/styles';
import calculateLayout from '../../utils/calculateLayout';

// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    margin: '0 auto',
  },
}));


const NoteList = (props) => {
  const [colNum, setColNum] = useState(2);
  const [layout, setLayout] = useState(null);
  const classes = useStyles();
  const { notes } = props;

  const specifyColNum = () => {
    const { clientWidth } = document.body;
    if (clientWidth <= 1100) setColNum(2);
    if (clientWidth > 1100 && clientWidth < 1350) setColNum(3);
    if (clientWidth >= 1350 && clientWidth < 1570) setColNum(4);
    if (clientWidth >= 1570) setColNum(5);
  };

  window.addEventListener('resize', (event) => {
    specifyColNum();
  });

  useEffect(() => {
    specifyColNum();
  }, []);

  useEffect(() => {
    if (notes && colNum) {
      const lay = calculateLayout(notes, colNum);
      console.log('noooo', colNum);

      setLayout(lay);
    }
  }, [notes, colNum]);

  return (
    <div className={classes.container}>
      {/* <h1>NOTYY</h1> */}
      {layout ? (
        <DragContainer layout={layout} />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  notes: state.firestore.data.notes,
});

NoteList.defaultProps = {
  notes: null,
};

NoteList.propTypes = {
  notes: PropTypes.oneOfType([PropTypes.object]),
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: 'notes',
      where: [['userId', '==', props.auth.uid]],
    },
  ]),
)(NoteList);
