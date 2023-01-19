import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { alpha, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { setFilteredNotes } from '../../store/notes/actions';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.action.hover, 0.05),
    '&:hover': {
      backgroundColor: alpha(theme.palette.action.hover, 0.1),
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

const Search = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const notes = useSelector((state) => _.values(state.notes.notes));
  const [search, setSearch] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleSearch = useCallback(() => {
    const filteredNotes = notes.filter((note) => {
      const isSearchPhraseInTitle = note.title
        .toLowerCase()
        .indexOf(search.toLowerCase());
      const isSearchPhraseInContent = note.content
        .toLowerCase()
        .indexOf(search.toLowerCase());

      if (
        (isSearchPhraseInTitle !== -1 || isSearchPhraseInContent !== -1) &&
        search.length > 0
      ) {
        return note;
      }

      return null;
    });

    if (filteredNotes.length > 0) {
      dispatch(setFilteredNotes(_.keyBy(filteredNotes, 'id')));
      return;
    }

    if (search.length > 0) {
      dispatch(setFilteredNotes({ msg: 'No matching results.' }));
      return;
    }

    dispatch(setFilteredNotes({}));
  }, [search, notes.length]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

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

export default Search;
