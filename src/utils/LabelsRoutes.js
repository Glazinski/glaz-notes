import React, { useEffect } from 'react';
import Home from '../components/Home';
import NotesList from '../components/notes/NotesList';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchLabels } from '../store/actions/labelsActions';
import { Route } from 'react-router-dom';

const LabelsRoutes = (props) => {
  const { labels } = props;

  useEffect(() => {
    props.fetchLabels();
  }, []);

  const routes = _.values(labels).map((item) => (
    <Route
      key={item.labelName}
      path={`/${item.labelName}`}
      render={(routerProps) => (
        <Home {...routerProps}>
          <span>elo</span>
        </Home>
      )}
    />
  ));

  return routes;
};

const mapStateToProps = (state) => ({
  labels: state.labels.labels,
});

export default connect(mapStateToProps, { fetchLabels })(LabelsRoutes);
