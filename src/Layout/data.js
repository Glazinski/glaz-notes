const colNum = 3;

const tasks = {
  'task-1': { id: 'task-1', content: 'Take out the garbage ake out the garbagake out the garbagake out the garbagake out the garbagthe garbagake out the garbagake' },
  'task-2': { id: 'task-2', content: 'Watch my favorite show' },
  'task-3': { id: 'task-3', content: 'Charge my phone' },
  'task-4': { id: 'task-4', content: 'Cook dinner' },
  'task-5': { id: 'task-5', content: 'Siemano cotam' },
  'task-6': { id: 'task-6', content: 'KARAAAAMBA' },
  'task-7': { id: 'task-7', content: 'ULALALALLALA' },
};

const taskIds = [];
for (let i = 0; i < colNum; i += 1) {
  taskIds.push([]);
}

for (let i = 0; i < Object.keys(tasks).length; i += 1) {
  taskIds[i % colNum].push(Object.keys(tasks)[i]);
}

const columns = {};
const columnOrder = [];
for (let i = 0; i < colNum; i += 1) {
  columnOrder.push(`column-${i + 1}`);
  columns[`column-${i + 1}`] = {
    id: `column-${i + 1}`,
    taskIds: taskIds[i],
  };
}

// console.log(columns, columnOrder);

const initialData = {
  tasks,
  columns,
  columnOrder,
};

const elo = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage ake out the garbagake out the garbagake out the garbagake out the garbagthe garbagake out the garbagake' },
    'task-2': { id: 'task-2', content: 'Watch my favorite show' },
    'task-3': { id: 'task-3', content: 'Charge my phone' },
    'task-4': { id: 'task-4', content: 'Cook dinner' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;
