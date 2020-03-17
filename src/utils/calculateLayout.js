export default (notes, colNum) => {
  const noteIds = [];
  for (let i = 0; i < colNum; i += 1) {
    noteIds.push([]);
  }

  for (let i = 0; i < Object.keys(notes).length; i += 1) {
    noteIds[i % colNum].push(Object.keys(notes)[i]);
  }

  const columns = {};
  const columnOrder = [];
  for (let i = 0; i < colNum; i += 1) {
    columnOrder.push(`column-${i + 1}`);
    columns[`column-${i + 1}`] = {
      id: `column-${i + 1}`,
      noteIds: noteIds[i],
    };
  }

  const initialData = {
    notes,
    columns,
    columnOrder,
  };

  console.log(initialData);

  return initialData;
};
