import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import NotesList from '../components/notes/NotesList';
import CreateNote from '../components/notes/CreateNote';

// Redux
import { connect } from 'react-redux';

const AnyLabel = (props) => {
  const { labelsList } = props;
  const { labelId } = props.match.params;
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
  labelsList: state.labels,
});

export default connect(mapStateToProps)(AnyLabel);
