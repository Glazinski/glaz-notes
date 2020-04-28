import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import NotesList from '../components/notes/NotesList';
import CreateNote from '../components/notes/CreateNote';

// Redux
import { connect } from 'react-redux';

const AnyLabel = (props) => {
  const { labelsList } = props;
  const { labelId } = useParams();
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const newLabels = [];
    if (labelId && _.values(labelsList).length > 0) {
      newLabels.push(labelsList[labelId].labelId);
    }
    setLabels(newLabels);
  }, [labelsList]);

  return (
    <>
      <CreateNote labels={labels} />
      <NotesList {...props} />
    </>
  );
};

const mapStateToProps = (state) => ({
  labelsList: state.labels.labels,
});

AnyLabel.defaultProps = {
  labelId: null,
};

AnyLabel.propTypes = {
  labelsList: PropTypes.oneOfType([PropTypes.object]).isRequired,
  labelId: PropTypes.string,
};

export default connect(mapStateToProps)(AnyLabel);
