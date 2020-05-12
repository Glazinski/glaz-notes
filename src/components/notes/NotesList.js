import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import DragContainer from '../../Layout/Container';
import { makeStyles } from '@material-ui/core/styles';
import calculateLayout from '../../utils/calculateLayout';
import useResponsiveBreakpoints from '../../hooks/useResponsiveBreakpoints';


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
    view,
  } = props;
  const { labelId } = useParams();
  const { pathname } = useLocation();
  const coll = pathname === '/' ? 'notes' : pathname.substr(1);
  const container = useRef(null);
  const breakSize = useResponsiveBreakpoints(container, [
    { xs: 535 },
    { sm: 800 },
    { md: 1200 },
    { lg: 1500 },
    { xl: 1800 },
    { xxl: 2000 },
  ]);

  useEffect(() => {
    if (view === 'list') {
      setColNum(1);
    } else {
      switch (breakSize) {
        case 'xs': setColNum(1); break;
        case 'sm': setColNum(2); break;
        case 'md': setColNum(3); break;
        case 'lg': setColNum(4); break;
        case 'xl': setColNum(5); break;
        case 'xxl': setColNum(6); break;
        default: break;
      }
    }
  }, [breakSize, view]);

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
    <div className={classes.container} ref={container}>
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
  view: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  notes: state.notes.notes,
  loading: state.notes.loading,
  labels: _.mapKeys(state.labels, 'labelName'),
  view: state.ui.view,
});

export default connect(mapStateToProps, { fetchNotes })(NoteList);
