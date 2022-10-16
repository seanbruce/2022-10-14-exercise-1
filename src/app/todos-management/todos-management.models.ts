export namespace TodosManagement {
  export type EditorMode = 'create' | 'update';
  export interface Todo {
    id: string;
    title: string;
    description: string;
    done: false;
  }
}

export namespace Index {
  export interface ViewModel {
    selectedTodo: TodosManagement.Todo;
  }
}

export namespace TodoList {
  export interface ViewModel {
    todos: TodosManagement.Todo[];
  }
}
