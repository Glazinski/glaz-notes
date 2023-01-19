import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { useStyles } from './NotesList.styles';
import Container from '../../Layout/Container';
import useResponsiveBreakpoints from '../../hooks/useResponsiveBreakpoints';
import useMasonryLayout from '../../hooks/useMasonryLayout';
import { fetchNotes } from '../../store/notes/actions';

const NoteList = (props) => {
  const classes = useStyles();
  const { notes, loading, fetchNotes, labels, view, filteredNotes } = props;
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
  const notesList =
    !_.has(filteredNotes, 'msg') && _.values(filteredNotes).length > 0
      ? filteredNotes
      : notes;
  const layout = useMasonryLayout(notesList, breakSize, view);

  useEffect(() => {
    const id = labelId || false;
    fetchNotes(coll, id);
  }, []);

  useEffect(() => {
    if (_.values(labels).length > 0 && labelId) {
      fetchNotes(coll, labelId);
    }
  }, [labelId]);

  return (
    <div className={classes.container} ref={container}>
      {layout && !loading && (
        <Container
          layout={layout}
          msg={_.has(filteredNotes, 'msg') ? filteredNotes.msg : null}
        />
      )}
    </div>
  );
};

NoteList.defaultProps = {
  notes: null,
  filteredNotes: null,
  labels: null,
};

NoteList.propTypes = {
  notes: PropTypes.oneOfType([PropTypes.object]),
  labels: PropTypes.oneOfType([PropTypes.object]),
  loading: PropTypes.bool.isRequired,
  fetchNotes: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  filteredNotes: PropTypes.oneOfType([PropTypes.object]),
};

const mapStateToProps = (state) => ({
  notes: state.notes.notes,
  filteredNotes: state.notes.filteredNotes,
  loading: state.notes.loading,
  labels: _.mapKeys(state.labels, 'labelName'),
  view: state.ui.view,
});

export default connect(mapStateToProps, { fetchNotes })(NoteList);
