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
    _.values(sortedNotes.starredNotes)
      .forEach((note, index) => starredNoteIds[index % colNum].push(note.id));

    _.values(sortedNotes.notes)
      .forEach((note, index) => noteIds[index % colNum].push(note.id));
  }

  const columns = {};
  const starredColumns = {};
  const columnOrder = [];
  const starredColumnOrder = [];
  for (let i = 0; i < colNum; i += 1) {
    starredColumnOrder.push(`starred-column-${i + 1}`);
    columnOrder.push(`column-${i + 1}`);
    columns[`column-${i + 1}`] = {
      id: `column-${i + 1}`,
      noteIds: noteIds[i],
      index: i + 1,
    };
    starredColumns[`starred-column-${i + 1}`] = {
      id: `starred-column-${i + 1}`,
      noteIds: starredNoteIds[i],
      index: i + 1,
    };
  }

  const initialData = {
    notes,
    columns,
    starredColumns,
    columnOrder,
    starredColumnOrder,
  };

  return initialData;
};
