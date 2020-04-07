import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import DragContainer from '../../Layout/Container';
import { makeStyles } from '@material-ui/core/styles';
import calculateLayout from '../../utils/calculateLayout';

// Redux
import { connect } from 'react-redux';
import { fetchNotes } from '../../store/actions/notesActions';


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
  const { notes, loading, fetchNotes } = props;
  const { pathname } = useLocation();
  const coll = pathname === '/' ? 'notes' : pathname.substr(1);

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
    fetchNotes(coll);
    specifyColNum();
  }, []);

  useEffect(() => {
    if (notes && colNum) {
      const lay = calculateLayout(notes, colNum);

      setLayout(lay);
    }
  }, [notes, colNum]);

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
};

NoteList.propTypes = {
  notes: PropTypes.oneOfType([PropTypes.object]),
  loading: PropTypes.bool.isRequired,
  fetchNotes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notes: state.notes.notes,
  loading: state.notes.loading,
});

export default connect(mapStateToProps, { fetchNotes })(NoteList);
