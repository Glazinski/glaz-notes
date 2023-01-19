import _ from 'lodash';

export default (notes, colNum) => {
  let sortedNotes = {
    starredNotes: {},
    notes: {},
  };

  _.values(notes).forEach((note) => {
    if (note.isStarred) {
      sortedNotes = {
        ...sortedNotes,
        starredNotes: {
          ...sortedNotes.starredNotes,
          [note.id]: { ...note },
        },
      };
    } else {
      sortedNotes = {
        ...sortedNotes,
        notes: {
          ...sortedNotes.notes,
          [note.id]: { ...note },
        },
      };
    }
  });

  const noteIds = [];
  const starredNoteIds = [];
  for (let i = 0; i < colNum; i += 1) {
    noteIds.push([]);
    starredNoteIds.push([]);
  }

  if (notes) {
    _.values(sortedNotes.starredNotes).forEach((note, index) =>
      starredNoteIds[index % colNum].push(note.id)
    );

    _.values(sortedNotes.notes).forEach((note, index) =>
      noteIds[index % colNum].push(note.id)
    );
  }

  const columns = {};
  const starredColumns = {};
  const columnOrder = [];
  const starredColumnOrder = [];
  for (let i = 0; i < colNum; i += 1) {
    const columnName = `column-${i + 1}`;
    const starredColumnName = `starred-column-${i + 1}`;

    starredColumnOrder.push(starredColumnName);
    columnOrder.push(columnName);
    columns[columnName] = {
      id: columnName,
      noteIds: noteIds[i],
      index: i + 1,
    };
    starredColumns[starredColumnName] = {
      id: starredColumnName,
      noteIds: starredNoteIds[i],
      index: i + 1,
    };
  }

  return {
    notes,
    columns,
    starredColumns,
    columnOrder,
    starredColumnOrder,
  };
};
