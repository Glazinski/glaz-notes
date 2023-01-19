import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { useStyles } from './Search.styles';
import { setFilteredNotes } from '../../store/notes/actions';

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
