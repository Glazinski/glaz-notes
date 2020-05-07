import React, { useState, useEffect, useRef } from 'react';
import ReactResizeDetector, { withResizeDetector } from 'react-resize-detector';
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
    width,
  } = props;
  const { labelId } = useParams();
  const { pathname } = useLocation();
  const coll = pathname === '/' ? 'notes' : pathname.substr(1);
  const container = useRef(null);

  const handleResize = (cntWidth) => {
    if (cntWidth <= 530) setColNum(1);
    if (cntWidth > 530 && cntWidth <= 765) setColNum(2);
    if (cntWidth > 765 && cntWidth < 1050) setColNum(3);
    if (cntWidth >= 1050 && cntWidth < 1350) setColNum(4);
    if (cntWidth >= 1350 && cntWidth < 1565) setColNum(5);
    if (cntWidth >= 1565 && cntWidth < 1850) setColNum(6);
    if (cntWidth >= 1850) setColNum(7);
  };

  useEffect(() => {
    const id = labelId || false;
    fetchNotes(coll, id);
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
    <ReactResizeDetector
      onResize={handleResize}
      handleWidth
    >
      <div className={classes.container} ref={container}>
        {layout && !loading ? (
          <DragContainer layout={layout} />
        ) : null}
      </div>
    </ReactResizeDetector>
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

export default connect(mapStateToProps, { fetchNotes })(withResizeDetector(NoteList));
