interface TODO {
  id: string;
  title: string;
  description: string;
}

const randomId = () => Math.random().toString(36).slice(2);
const waitFor = (millisecond: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, millisecond);
  });

const todos: TODO[] = [
  {
    id: randomId(),
    title: '學習Angular',
    description: '使用Angular官網學習Angular的使用',
  },
  {
    id: randomId(),
    title: '學習C#',
    description: '學習C#的基礎知識',
  },
  {
    id: randomId(),
    title: '學習ABP',
    description: '學習ABP的開發',
  },
];

const createTodo = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  await waitFor(100);
  todos.push({
    id: randomId(),
    title,
    description,
  });
};

const deleteTodo = async (id: string) => {
  await waitFor(100);
  const matchedTodoIndex = todos.findIndex((todo) => todo.id === id);
  if (!~matchedTodoIndex) {
    throw Error("Can't delete todo with id: [" + id + '].');
  }
  todos.splice(matchedTodoIndex, 1);
};

const getTodos = async () => {
  await waitFor(100);
  return todos.map((todo) => ({ ...todo }));
};

export { createTodo, deleteTodo, getTodos };

export type { TODO };
