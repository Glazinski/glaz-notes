import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useLocation, useParams } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { setFilteredNotes, fetchNotes } from '../../store/actions/notesActions';

// MUI
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.action.hover, 0.05),
    '&:hover': {
      backgroundColor: fade(theme.palette.action.hover, 0.10),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(3),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Search = (props) => {
  const classes = useStyles();
  const { notes, setFilteredNotes, fetchNotes } = props;
  const [search, setSearch] = useState('');
  const { labelId } = useParams();
  const { pathname } = useLocation();
  const coll = pathname === '/' ? 'notes' : pathname.substr(1);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  useEffect(() => {
    const filteredNotes = notes.filter((note) => {
      const cond1 = note.title.toLowerCase().indexOf(search.toLowerCase());
      const cond2 = note.content.toLowerCase().indexOf(search.toLowerCase());
      if (cond1 !== -1 || cond2 !== -1) {
        return note;
      }

      return null;
    });

    if (search.length === 0) {
      const id = labelId || false;
      fetchNotes(coll, id);
    } else {
      setFilteredNotes(_.keyBy(filteredNotes, 'id'));
    }
  }, [search]);

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        onChange={handleChange}
        value={search}
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  notes: _.values(state.notes.notes),
});

Search.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  setFilteredNotes: PropTypes.func.isRequired,
  fetchNotes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { setFilteredNotes, fetchNotes })(Search);
