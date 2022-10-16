import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

interface TODO {
  id: string;
  title: string;
  description: string;
  done: boolean;
}

type EditorMode = 'create' | 'update';

interface TodoStoreInterface {
  todos: TODO[];
  isEditorOpen: boolean;
  editorMode: EditorMode;
  defaultFormValues: TODO | null;
  titleSearchString: string;
  paginationIndex: number;
  paginationPageSize: number;
}

const randomId = () => Math.random().toString(36).slice(2);

const pageSizeOptions = [5, 10, 15];
const defaultState: TodoStoreInterface = {
  todos: [
    {
      id: randomId(),
      title: '學習Angular',
      description: '使用Angular官網學習Angular的使用',
      done: true,
    },
    {
      id: randomId(),
      title: '學習C#',
      description: '學習C#的基礎知識',
      done: false,
    },
    {
      id: randomId(),
      title: '學習ABP',
      description: '學習ABP的開發',
      done: false,
    },
  ],
  isEditorOpen: false,
  editorMode: 'create',
  defaultFormValues: null,
  titleSearchString: '',
  paginationIndex: 1,
  paginationPageSize: pageSizeOptions[0],
};

@Injectable()
class TodoStore extends ComponentStore<TodoStoreInterface> {
  constructor() {
    super(defaultState);
  }

  pageSizeOptions = pageSizeOptions;

  readonly todos$: Observable<TODO[]> = this.select((state) => state.todos);
  readonly isEditorOpen$: Observable<boolean> = this.select(
    (state) => state.isEditorOpen
  );
  readonly editorMode$: Observable<EditorMode> = this.select(
    (state) => state.editorMode
  );
  readonly defaultFormValues$: Observable<TODO | null> = this.select(
    (state) => state.defaultFormValues
  );
  readonly titleSearchString$: Observable<string> = this.select(
    (state) => state.titleSearchString
  );
  readonly paginationIndex$: Observable<number> = this.select(
    (state) => state.paginationIndex
  );
  readonly paginationPageSize$: Observable<number> = this.select(
    (state) => state.paginationPageSize
  );

  readonly updateEditMode = this.updater((state, mode: EditorMode) => ({
    ...state,
    editorMode: mode,
  }));

  readonly openEditor = this.updater((state) => ({
    ...state,
    isEditorOpen: true,
  }));

  readonly closeEditor = this.updater((state) => ({
    ...state,
    isEditorOpen: false,
  }));

  readonly addTodo = this.updater((state, todo: Omit<TODO, 'id' | 'done'>) => ({
    ...state,
    isEditorOpen: false,
    todos: [
      ...state.todos,
      {
        id: randomId(),
        title: todo.title,
        description: todo.description,
        done: false,
      },
    ],
  }));

  readonly editTodo = this.updater((state, updatedTodo: TODO) => ({
    ...state,
    isEditorOpen: false,
    todos: state.todos.map((todo) => {
      if (todo.id !== updatedTodo.id) {
        return todo;
      }
      return {
        ...todo,
        ...updatedTodo,
      };
    }),
  }));

  readonly updateDefaultFormValues = this.updater(
    (state, defaultFormValues: TODO | null) => ({
      ...state,
      defaultFormValues,
    })
  );

  readonly updateTitleSearchString = this.updater(
    (state, newString: string) => ({
      ...state,
      titleSearchString: newString,
      // paginationIndex: defaultState.paginationIndex,
    })
  );

  readonly removeTodo = this.updater((state, id: string) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  }));

  readonly updatePaginationIndex = this.updater((state, index: number) => ({
    ...state,
    paginationIndex: index,
  }));

  readonly updatePaginationPageSize = this.updater(
    (state, pageSize: number) => ({
      ...state,
      paginationIndex: defaultState.paginationIndex,
      paginationPageSize: pageSize,
    })
  );

  readonly toggleTodo = this.updater((state, id: string) => ({
    ...state,
    todos: state.todos.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }
      return { ...todo, done: !todo.done };
    }),
  }));
}

export { TodoStore };

export type { TODO, EditorMode };
