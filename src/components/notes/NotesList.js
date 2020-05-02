import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import DragContainer from '../../Layout/Container';
import { makeStyles } from '@material-ui/core/styles';
import calculateLayout from '../../utils/calculateLayout';

// Redux
import { connect } from 'react-redux';
import { fetchNotes } from '../../store/actions/notesActions';


const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    margin: '0 auto',
  },
}));


const NoteList = (props) => {
  const [colNum, setColNum] = useState(2);
  const [layout, setLayout] = useState(null);
  const classes = useStyles();
  const {
    notes,
    loading,
    fetchNotes,
    labels,
  } = props;
  const { labelId } = useParams();
  const { pathname } = useLocation();
  const coll = pathname === '/' ? 'notes' : pathname.substr(1);

  const specifyColNum = () => {
    const { clientWidth } = document.body;
    if (clientWidth <= 600) setColNum(1);
    if (clientWidth > 600 && clientWidth <= 1100) setColNum(2);
    if (clientWidth > 1100 && clientWidth < 1350) setColNum(3);
    if (clientWidth >= 1350 && clientWidth < 1570) setColNum(4);
    if (clientWidth >= 1570) setColNum(5);
  };

  window.addEventListener('resize', () => {
    specifyColNum();
  });

  useEffect(() => {
    const id = labelId || false;
    fetchNotes(coll, id);
    specifyColNum();
  }, []);

  useEffect(() => {
    if (notes && colNum) {
      const lay = calculateLayout(notes, colNum);

      setLayout(lay);
    }
  }, [notes, colNum]);

  useEffect(() => {
    if (_.values(labels).length > 0 && labelId) {
      fetchNotes(coll, labelId);
    }
  }, [labelId]);

  return (
    <div className={classes.container}>
      {layout && !loading ? (
        <DragContainer layout={layout} />
      ) : null}
    </div>
  );
};

NoteList.defaultProps = {
  notes: null,
  labels: null,
};

NoteList.propTypes = {
  notes: PropTypes.oneOfType([PropTypes.object]),
  labels: PropTypes.oneOfType([PropTypes.object]),
  loading: PropTypes.bool.isRequired,
  fetchNotes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notes: state.notes.notes,
  loading: state.notes.loading,
  labels: _.mapKeys(state.labels, 'labelName'),
});

export default connect(mapStateToProps, { fetchNotes })(NoteList);
