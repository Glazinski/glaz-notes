import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import NotesList from '../components/notes/NotesList';
import CreateNote from '../components/notes/CreateNote';

const AnyLabel = (props) => {
  const labelsList = useSelector((state) => state.labels.labels);
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

AnyLabel.defaultProps = {
  labelId: null,
};

export default AnyLabel;
