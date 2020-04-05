import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
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
    // console.log(props.notes);
    if (notes && colNum) {
      const lay = calculateLayout(notes, colNum);

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

const mapStateToProps = (state) => {
  const { userNotes } = state.firestore.data;
  // console.log(userNotes);
  let data = {};
  _.forIn(userNotes, (value, key) => {
    if (value !== null) {
      data = { ...data, [key]: value };
    }
  });

  return ({
    auth: state.firebase.auth,
    notes: data,
    // notes: userNotes,
  });
};

NoteList.defaultProps = {
  notes: null,
};

NoteList.propTypes = {
  notes: PropTypes.oneOfType([PropTypes.object]),
};

export default compose(
  firestoreConnect((props) => {
    const { uid } = props.firebase.auth().currentUser;
    const { pathname } = props.location;
    const coll = pathname === '/' ? 'notes' : pathname.substr(1);

    return [
      {
        collection: `${coll}`,
        doc: `${uid}`,
        subcollections: [
          { collection: 'userNotes' },
        ],
        storeAs: 'userNotes',
        // where: [['userId', '==', props.auth.uid]],
      // orderBy: ['position', 'asc'],
      },
    ];
  }),
  connect(mapStateToProps),
)(NoteList);
